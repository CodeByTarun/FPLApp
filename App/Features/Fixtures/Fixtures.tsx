import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import FixtureCard from './FixtureCard/FixtureCard'
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import { changeGameweek, changeToBudgetTeam, changeToDraftTeam, changeToEmpty, changeToFixture, changingFixtureWhenGameweekChanged, TeamTypes } from "../../Store/teamSlice";
import { goToFixturesScreen, goToMainScreen, ScreenTypes } from "../../Store/navigationSlice";
import { styles } from "./FixturesStyles";
import { AnimatedButton, CustomButton } from "../Controls";
import { getAllUserTeamInfo } from "../../Helpers/FplDataStorageService";
import { FplGameweek } from "../../Models/FplGameweek";
import globalStyles from "../../Global/GlobalStyles";
import GameweekView from "./GameweekView";
import { FIXTURES_VIEW_HEIGHT } from "../../Global/GlobalConstants";
import { animated, useChain, useSpring, useSpringRef } from "@react-spring/native";
import FixtureCardLoading from "./FixtureCardLoading";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { changeMutableView } from "../../Store/modalSlice";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import { Icons } from "../../Global/Images";

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
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
  const teamInfo = useAppSelector(state => state.team);
  const navigation = useAppSelector(state => state.navigation);

  const fixtureScrollViewRef = useRef<ScrollView>(null);

  const expandRef = useSpringRef();
  const expandSpring = useSpring({ height: (navigation.screenType !== ScreenTypes.Fixtures) ? FIXTURES_VIEW_HEIGHT : '100%', ref: expandRef, config: { friction: 18, mass: 0.5 }});

  useChain([expandRef]);

  const [gameweekButtonAnimatedStyle, gameweekButtonAnimatedApi] = useSpring(() => ({ scale: 1 }));
  
  const onGamweekButtonPress = () => {
    gameweekButtonAnimatedApi.start({
      to: [
        { scale: 0.95 },
        { scale: 1 }
      ],
      config: {duration: 10},
      onRest: gameweekButton,
    });
  }

  const gameweekButton = useCallback(() => {
    dispatch(changeMutableView({view: <GameweekView overview={overview}/>, width: '65%'}));

    navigator.navigate('MutableModal');
  }, [teamInfo.gameweek])

  useEffect( function setInitialData() {

      if (teamInfo.teamType === TeamTypes.Empty) {
        setTeam();
      }

    }, []);

  const setTeam = async() => {
    let teams = await getAllUserTeamInfo();

    if (teams && teams.length > 0) {
      let favouriteTeam = teams.find(team => team.isFavourite === true);

      if (favouriteTeam) {
        dispatch(favouriteTeam?.isDraftTeam ? changeToDraftTeam(favouriteTeam) : changeToBudgetTeam(favouriteTeam))
      }
    } else {
      setSelectedFixture();
    }
  }

  useEffect( function changeSelectedFixture() {

      setSelectedFixture();

    }, [teamInfo.gameweek]);

  function setSelectedFixture() {
    fixtureScrollViewRef.current?.scrollTo({ x:0, y:0, animated:true });

      if ((teamInfo.teamType === TeamTypes.Empty && fixtures) || (teamInfo.teamType === TeamTypes.Fixture && fixtures)) {
        let sortedGameweekFixtures: FplFixture[] | undefined = fixtures.filter((fixture) => { return fixture.event == teamInfo.gameweek})
                                                                       .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2));
      
        if (sortedGameweekFixtures !== undefined) {
            dispatch(changeToFixture(sortedGameweekFixtures[0]));                            
        }
      }

      if ((teamInfo.gameweek > teamInfo.liveGameweek) && (navigation.screenType !== ScreenTypes.Fixtures)) {
        dispatch(goToFixturesScreen());
      }
  }

    const onInfoButtonPress = useCallback(() => {
      navigator.navigate('InfoModal');
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
              fixtures.filter((fixture) => { return fixture.event == (teamInfo.gameweek !== 0 ? teamInfo.gameweek : 1)})
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
          <View style={[styles.bottomBar, globalStyles.topShadow]}>
            <View style={styles.bottomaBarSections}>
              <AnimatedButton buttonFn={() => dispatch(changeGameweek(teamInfo.gameweek - 1))} disabled={(teamInfo.gameweek <= 1)}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.text}>Prev</Text>
                </View>
              </AnimatedButton>
            </View>
            <VerticalSeparator/>
            <View style={styles.bottomaBarSections}>
              <AnimatedButton buttonFn={onCalendarButtonPress}>
                <View style={styles.buttonContainer}>
                  <Image style={styles.image} source={Icons['calendar']} resizeMode='contain'/>
                </View>
              </AnimatedButton>
            </View>
            <VerticalSeparator/>
            <View style={styles.bottomaBarSections}>
              <AnimatedButton buttonFn={() => dispatch(changeGameweek(teamInfo.gameweek + 1))} disabled={(teamInfo.gameweek >= 38)}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.text}>Next</Text>
                </View>
              </AnimatedButton>
            </View>
          </View>
        }

      </View>
      
    </AnimatedView>
  )
}

export default Fixtures;

// <