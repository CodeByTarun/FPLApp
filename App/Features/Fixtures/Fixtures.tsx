import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import FixtureCard from './FixtureCard/FixtureCard'
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import { changeGameweek, changeToBudgetTeam, changeToDraftTeam, changeToEmpty, changeToFixture, changingFixtureWhenGameweekChanged, TeamTypes } from "../../Store/teamSlice";
import { goToFixturesScreen, goToMainScreen, ScreenTypes } from "../../Store/navigationSlice";
import { FixturesStyles } from "./FixturesStyles";
import { AnimatedButton, CustomButton } from "../Controls";
import { getAllUserTeamInfo } from "../../Helpers/FplDataStorageService";
import { FplGameweek } from "../../Models/FplGameweek";
import globalStyles from "../../Global/GlobalStyles";
import GameweekView from "./GameweekView";
import { FIXTURES_VIEW_CONTROLS_HEIGHT, FIXTURES_VIEW_HEIGHT, height, largeFont, mediumFont, textPrimaryColor, width } from "../../Global/GlobalConstants";
import { animated, useChain, useSpring, useSpringRef } from "@react-spring/native";
import FixtureCardLoading from "./FixtureCardLoading";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { changeMutableView } from "../../Store/modalSlice";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import { Icons } from "../../Global/Images";
import { moderateScale } from "react-native-size-matters";
import moment from "moment";
import { timezone } from "expo-localization";
import { notEqual } from "assert";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SortFixtures } from "../../Helpers/FplAPIHelpers";

const AnimatedView = animated(View);
const AnimatedPressable = animated(Pressable);

interface FixturesViewProp {
  overview: FplOverview | undefined;
  fixtures: FplFixture[] | undefined;
  gameweek: FplGameweek | undefined;
}

const Fixtures = ({overview, fixtures, gameweek}: FixturesViewProp) => {

  const theme = useTheme();
  const styles = FixturesStyles(theme);
  const insets = useSafeAreaInsets();

  let dateNow = new Date().toISOString();

  const dispatch = useAppDispatch();
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
  const teamInfo = useAppSelector(state => state.team);
  const navigation = useAppSelector(state => state.navigation);

  const fixtureScrollViewRef = useRef<ScrollView>(null);

  const expandRef = useSpringRef();

  useChain([expandRef]);

  const [gameweekButtonAnimatedStyle, gameweekButtonAnimatedApi] = useSpring(() => ({ scale: 1 }));
  
  const onGamweekButtonPress = () => {
    gameweekButtonAnimatedApi.start({
      to: [
        { scale: 0.95 },
        { scale: 1 }
      ],
      config: {duration: 100},
    });
    gameweekButton();
  }

  const gameweekButton = useCallback(() => {
    if (overview) {
      dispatch(changeMutableView({view: <GameweekView overview={overview}/>, width: moderateScale(275)}));

      navigator.navigate('MutableModal');
    }
  }, [teamInfo.gameweek, overview]);

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
        let sortedGameweekFixtures: FplFixture[] | undefined = fixtures.filter((fixture) => { return fixture.event === teamInfo.gameweek})
                                                                       .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2, dateNow));

      
        if (sortedGameweekFixtures !== undefined && sortedGameweekFixtures.length !== 0) {
            dispatch(changeToFixture(sortedGameweekFixtures[0]));                            
        }
      }

      if ((teamInfo.gameweek > teamInfo.liveGameweek) && (navigation.screenType !== ScreenTypes.Fixtures)) {
        dispatch(goToFixturesScreen());
      }
  }

    const onSettingsButtonPress = useCallback(() => {
      navigator.navigate('SettingsModal');
    }, [])

  return (
    <AnimatedView style={[styles.animatedView, { height: `${(FIXTURES_VIEW_HEIGHT/ (height - insets.top - insets.bottom)) * 100}%` }]}>
      <View style={styles.controlsContainer}>
          <View style={{flex: 1}}/>
          <AnimatedPressable testID={'gameweekButton'} style={[styles.gameweekButton, { transform: [{ scale: gameweekButtonAnimatedStyle.scale }]}]} onPress={onGamweekButtonPress}>
            <Text style={styles.gameweekText}>  Gameweek {teamInfo.gameweek}  </Text>
            <Text style={styles.gameweekDropDownSymbol}>◣</Text>
          </AnimatedPressable>
          <View style={styles.buttonsContainers}>
            <View style={styles.singleButtonContainer}>
              <CustomButton image="cogwheel" buttonFunction={onSettingsButtonPress}/>
            </View>
          </View>
      </View>  
      <View style={styles.fixturesListContainer}>
        { (fixtures && gameweek && overview) ?
          <ScrollView ref={fixtureScrollViewRef} 
                      horizontal={true} 
                      showsHorizontalScrollIndicator={false}
                      style={styles.fixturesScrollView} 
                      testID='fixturesScrollView'>
            { ( fixtures.filter((fixture) => { return fixture.event == (teamInfo.gameweek !== 0 ? teamInfo.gameweek : 1)}).length > 0 ) ? 
                <>
                  {fixtures.filter((fixture) => { return fixture.event == (teamInfo.gameweek !== 0 ? teamInfo.gameweek : 1)})
                          .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2, dateNow))
                          .map((fixture) => { return <FixtureCard key={fixture.code} fixture={fixture} gameweekData={gameweek} overview={overview}/> }) }
                </>   
               :
              <View style={[ { alignItems: 'center', justifyContent: 'center', width: width - 5, height: '100%'}]}>
                <Text style={{alignSelf: 'center', textAlign: 'center', color: textPrimaryColor, fontSize: mediumFont, width: '100%'}}>No fixtures this gameweek.</Text>
              </View> 
            }
          </ScrollView> :
          <View style={[styles.fixturesScrollView, {flexDirection: 'row'}]}>
            <FixtureCardLoading/>
            <FixtureCardLoading/>
            <FixtureCardLoading/>
          </View>
        }
      </View>
      
    </AnimatedView>
  )
}

export default Fixtures;

// <