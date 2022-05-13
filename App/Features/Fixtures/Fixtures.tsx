import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated, Pressable } from "react-native";
import FixtureCard from './FixtureCard/FixtureCard'
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import { changeGameweek, changeToBudgetTeam, changeToDraftTeam, changeToEmpty, changingFixtureWhenGameweekChanged, removeFixture, TeamTypes } from "../../Store/teamSlice";
import { openInfoModal } from "../../Store/modalSlice";
import { goToFixturesScreen, goToMainScreen, ScreenTypes } from "../../Store/navigationSlice";
import { styles } from "./FixturesStyles";
import { CustomButton, ToolTip } from "../Controls";
import { getAllUserTeamInfo } from "../../Helpers/FplDataStorageService";
import { FplGameweek } from "../../Models/FplGameweek";
import globalStyles from "../../Global/GlobalStyles";
import GameweekView from "./GameweekView";
import { FIXTURES_VIEW_HEIGHT, height, width } from "../../Global/GlobalConstants";
import { animated, config, useChain, useSpring, useSpringRef } from "@react-spring/native";
import FixtureCardLoading from "./FixtureCardLoading";
import FixturesViewButton from "./FixturesViewButton";

const AnimatedView = animated(View);
const AnimatedPressable = animated(Pressable);

interface FixturesViewProp {
  overview: FplOverview;
  fixtures: FplFixture[] | undefined;
  gameweek: FplGameweek | undefined;
}

function SortFixtures(fixture1: FplFixture, fixture2: FplFixture) : number {
  if (fixture1.finished_provisional !== true && fixture2.finished_provisional === true) {
    return -1;
  }
  return 0;
}

const Fixtures = ({overview, fixtures, gameweek}: FixturesViewProp) => {

  const dispatch = useAppDispatch();
  const liveGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;
  const teamInfo = useAppSelector(state => state.team);
  const navigation = useAppSelector(state => state.navigation);

  const [isGameweekViewVisible, setIsGameweekViewVisible] = useState(false);

  const fixtureScrollViewRef = useRef<ScrollView>(null);

  const expandRef = useSpringRef();
  const expandSpring = useSpring({ height: (navigation.screenType !== ScreenTypes.Fixtures) ? 120 : height, ref: expandRef, config: { friction: 18, mass: 0.5 }});

  useChain([expandRef]);

  const [gameweekButtonAnimatedStyle, gameweekButtonAnimatedApi] = useSpring(() => ({ scale: 1 }));
  
  const onGamweekButtonPress = () => {
    gameweekButtonAnimatedApi.start({
      to: [
        { scale: 0.95 },
        { scale: 1 }
      ],
      config: {duration: 10},
      onRest: () => setIsGameweekViewVisible(true),
    });
  }

  const setTeam = async() => {
    let teams = await getAllUserTeamInfo();
        
    if (teams) {
      let favouriteTeam = teams.find(team => team.isFavourite === true);

      if (favouriteTeam) {
        dispatch(favouriteTeam?.isDraftTeam ? changeToDraftTeam(favouriteTeam) : changeToBudgetTeam(favouriteTeam))
      }
    } else {
      dispatch(changeToEmpty());
    }
  }

  useEffect( function setInitialData() {

      if (teamInfo.teamType === TeamTypes.Empty) {
        setTeam();
      }

    }, []);

  useEffect( function setSelectedFixture() {

      fixtureScrollViewRef.current?.scrollTo({ x:0, y:0, animated:true });

      if(teamInfo.teamType === TeamTypes.Fixture && fixtures) {
        let sortedGameweekFixtures: FplFixture[] | undefined = fixtures.filter((fixture) => { return fixture.event == teamInfo.gameweek})
                                                                       .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2));
      
        if (sortedGameweekFixtures !== undefined) {

          if (sortedGameweekFixtures[0].started === true) {
            dispatch(changingFixtureWhenGameweekChanged(sortedGameweekFixtures[0]));
          } 
          else {
            setTeam();
          }                              
        }
      }

      if ((teamInfo.gameweek > liveGameweek) && (navigation.screenType !== ScreenTypes.Fixtures)) {
        dispatch(goToFixturesScreen());
      }
    }, [teamInfo.gameweek]);

    const onInfoButtonPress = useCallback(() => {
      dispatch(openInfoModal());
    }, [])

    const onCalendarButtonPress = useCallback(() => {
      if (navigation.screenType === ScreenTypes.Fixtures) {
        dispatch(goToMainScreen());
      } else {
        dispatch(goToFixturesScreen());
      } 
    }, [navigation])

  return (
    <AnimatedView style={[styles.animatedView, { height: expandSpring.height }]}>
      <View style={styles.controlsContainer}>
          <View style={{flex: 1}}/>
          <AnimatedPressable style={[styles.gameweekButton, { transform: [{ scale: gameweekButtonAnimatedStyle.scale }]}]} onPress={onGamweekButtonPress}>
            <Text style={styles.gameweekText}>  Gameweek {teamInfo.gameweek}  </Text>
            <Text style={styles.gameweekDropDownSymbol}>◣</Text>
          </AnimatedPressable>
          <View style={styles.buttonsContainers}>
            <View style={styles.singleButtonContainer}>
              <CustomButton image="info" buttonFunction={onInfoButtonPress}/>
            </View>
          </View>
      </View>  
      <View style={styles.fixturesListContainer}>
        { (fixtures && gameweek) ?
          <ScrollView ref={fixtureScrollViewRef} 
                      horizontal={(navigation.screenType === ScreenTypes.Fixtures) ? false : true} 
                      showsHorizontalScrollIndicator={false} 
                      style={{ flex: 1, marginLeft: 2.5, marginRight: 2.5 }} 
                      contentContainerStyle={(navigation.screenType === ScreenTypes.Fixtures) ? {flex: 1, flexDirection: 'row', flexWrap: 'wrap'} : {}}
                      testID='fixturesScrollView'>
            { 
              fixtures.filter((fixture) => { return fixture.event == teamInfo.gameweek})
                      .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2))
                      .map((fixture) => { return <FixtureCard key={fixture.code} fixture={fixture} gameweekData={gameweek} overview={overview}/> })     
            }
          </ScrollView> :
          <View style={{flexDirection: 'row', flex: 1, marginLeft: 2.5, marginRight: 2.5}}>
            <FixtureCardLoading/>
            <FixtureCardLoading/>
            <FixtureCardLoading/>
          </View>
        }
        { (navigation.screenType === ScreenTypes.Fixtures) && 
          <>
            <View style={styles.closeFixtureViewButtonContainer}>
              <FixturesViewButton buttonFn={onCalendarButtonPress} isVisible={(teamInfo.gameweek <= liveGameweek)}>
                <View style={[styles.closeFixtureViewButton, globalStyles.modalShadow]}>
                  <Text style={styles.closeFixtureViewButtonText}>Close</Text>
                </View>
              </FixturesViewButton>
            </View>

            <View style={styles.previousGameweekButtonContainer}>
              <FixturesViewButton buttonFn={() => dispatch(changeGameweek(teamInfo.gameweek - 1))} isVisible={(teamInfo.gameweek > 1)}>
                <View style={[styles.previousGamweekButton, globalStyles.modalShadow]}>
                  <Text style={styles.closeFixtureViewButtonText}>Prev</Text>
                </View>
              </FixturesViewButton>
            </View>

            <View style={styles.nextGameweekButtonContainer}>
              <FixturesViewButton buttonFn={() => dispatch(changeGameweek(teamInfo.gameweek + 1))} isVisible={(teamInfo.gameweek < 38)}>
                <View style={[styles.nextGamweekButton, globalStyles.modalShadow]}>
                  <Text style={styles.closeFixtureViewButtonText}>Next</Text>
                </View>
              </FixturesViewButton>
            </View>
          </>
        }

      </View>
      <ToolTip distanceFromRight={width * 0.15} distanceFromTop={height * 0.1} 
               distanceForArrowFromRight={width * 0.3} isVisible={isGameweekViewVisible} 
               setIsVisible={setIsGameweekViewVisible} 
               view={
               <View style={styles.gameweekViewContainer}>
                 <GameweekView isVisible={isGameweekViewVisible} setIsVisible={setIsGameweekViewVisible} liveGameweek={liveGameweek} overview={overview}/>
               </View>}/>
    </AnimatedView>
  )
}

export default Fixtures;

// <