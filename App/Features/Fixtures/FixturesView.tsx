import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, StatusBar, Platform, useWindowDimensions } from "react-native";
import FixtureCard from './FixtureCard'
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { useGetFixturesQuery, useGetGameweekDataQuery, useGetOverviewQuery, } from '../../Store/fplSlice'
import * as GlobalConstants from '../../Global/GlobalConstants'
import { FplOverview } from "../../Models/FplOverview";
import RNPickerSelect from 'react-native-picker-select';
import { FplFixture } from "../../Models/FplFixtures";
import { changeGameweek, changeToFixture, changingFixtureWhenGameweekChanged, removeFixture } from "../../Store/teamSlice";
import { IsThereAMatchInProgress } from "../../Helpers/FplAPIHelpers";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Dropdown from "../Controls/Dropdown";
import globalStyles from "../../Global/GlobalStyles";
import CustomButton from "../Controls/CustomButton";
import { openGameweekModal } from "../../Store/modalSlice";
import { goToFixturesScreen, goToMainScreen, ScreenTypes } from "../../Store/navigationSlice";

//TODO: Decide on a good refresh rate for live game data (right now set to 30 seconds)

interface FixturesViewProp {
  overview: FplOverview;
}

function SortFixtures(fixture1: FplFixture, fixture2: FplFixture) : number {
  if (fixture1.finished_provisional !== true && fixture2.finished_provisional === true) {
    return -1;
  }
  return 0;
}

const FixturesView = (props: FixturesViewProp) => {

  const dispatch = useAppDispatch();
  const liveGameweek = props.overview.events.filter((event) => { return event.is_current === true; })[0].id;
  const teamInfo = useAppSelector(state => state.team);
  const navigation = useAppSelector(state => state.navigation);
  const fixtures = useGetFixturesQuery();
  const gameweekData = useGetGameweekDataQuery((teamInfo.gameweek) ? teamInfo.gameweek : skipToken);

  const fixtureScrollViewRef = useRef<ScrollView>(null);
  const expandAnim = useRef(new Animated.Value(0)).current;
  
  const heightInterpolate = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', (100 / 19 * 100).toString() + '%']
  })

  const Expand = useCallback(() => {
    Animated.spring(expandAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: false
    }).start();
  }, [])

  const Minimize = useCallback(() => {
      Animated.spring(expandAnim, {
          toValue: 0,
          friction: 10,
          useNativeDriver: false
      }).start();
  },[])

  useEffect(
    function setInitialGameweek() {
      if (props.overview) {
        let gameweekNumber = props.overview.events.find(event => event.is_current === true)?.id;
        if (gameweekNumber) {
          dispatch(changeGameweek(gameweekNumber))
        }
      }
    }, []);

  useEffect(
    function setSelectedFixture() {

      fixtureScrollViewRef.current?.scrollTo({ x:0, y:0, animated:true });

      let sortedGameweekFixtures: FplFixture[] | undefined = fixtures.data?.filter((fixture) => { return fixture.event == teamInfo.gameweek})
                                                                           .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2));

      if (sortedGameweekFixtures !== undefined) {

        if (sortedGameweekFixtures[0].started === true) {
          dispatch(changingFixtureWhenGameweekChanged(sortedGameweekFixtures[0]));
        } 
        else {
          dispatch(removeFixture());
        }                              
      }

      if ((teamInfo.gameweek > liveGameweek) && (navigation.screenType !== ScreenTypes.Fixtures)) {
        dispatch(goToFixturesScreen());
      }
    }, [teamInfo.gameweek]);

  useEffect(
    function refetchLiveGameweekData() {
      let refetchFixture: NodeJS.Timer;
      let refetchGameweek: NodeJS.Timer;

      if (teamInfo.gameweek !== undefined && fixtures.data !== undefined) {
        if (teamInfo.gameweek === liveGameweek && IsThereAMatchInProgress(teamInfo.gameweek, fixtures.data)) {
          refetchFixture = setInterval(() => fixtures.refetch(), 30000);
          refetchGameweek = setInterval(() => gameweekData.refetch(), 30000);
        }
      }
      
      return function stopRefetchingLiveGameweekData() {
        if (refetchFixture !== undefined) {
          clearInterval(refetchFixture);
          clearInterval(refetchGameweek);
        }
      };
    }, [teamInfo.gameweek]);

    const onInfoButtonPress = useCallback(() => {

    }, [])

    const onCalendarButtonPress = useCallback(() => {
      if (navigation.screenType === ScreenTypes.Fixtures) {
        dispatch(goToMainScreen());
      } else {
        dispatch(goToFixturesScreen());
      }
      
    }, [navigation])

    useEffect( function openAndCloseFixtureView() {
      if (navigation.screenType === ScreenTypes.Fixtures) {
        Expand();
      } else {
        Minimize();
      }
    }, [navigation]);

    const onGameweekButtonPress = useCallback(() => {
      dispatch(openGameweekModal());
    }, [])

  return (
    <Animated.View style={{ backgroundColor: GlobalConstants.primaryColor, height: heightInterpolate, zIndex: 2 }}>
      <View style={{ height: GlobalConstants.height * 0.075, width: '100%' }}>
        {props.overview && 

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={[styles.gameweekButton]} onPress={onGameweekButtonPress}>
              <Text style={{color: GlobalConstants.textPrimaryColor, alignSelf: 'center', fontSize: GlobalConstants.largeFont * 0.9, fontWeight: '700'}}>Gameweek {teamInfo.gameweek}  </Text>
              <Text style={{color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.6, fontWeight: '700', marginTop: 0, transform: [{rotate: '-45deg'}], alignSelf: 'center', marginBottom: 5}}>◣</Text>
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              { (teamInfo.gameweek <= liveGameweek) &&
                <View style={{height: '60%', aspectRatio: 1}}>
                  <CustomButton image="calendar" buttonFunction={onCalendarButtonPress}/>
                </View>
              }
              <View style={{height: '60%', alignSelf:'center', aspectRatio: 1}}>
                <CustomButton image="info" buttonFunction={onInfoButtonPress}/>
              </View>
            </View>
          </View>  
        }
      </View>
      <View style={{flex: 1}}>
      { (fixtures.isSuccess == true) &&
          <ScrollView ref={fixtureScrollViewRef} 
                      horizontal={(navigation.screenType === ScreenTypes.Fixtures) ? false : true} 
                      showsHorizontalScrollIndicator={false} 
                      style={{ flex: 1, marginLeft: 2.5, marginRight: 2.5 }} 
                      contentContainerStyle={(navigation.screenType === ScreenTypes.Fixtures) ? {flex: 1, flexDirection: 'row', flexWrap: 'wrap'} : {}}>
            { (fixtures.data && gameweekData.data && props.overview) &&

              fixtures.data.filter((fixture) => { return fixture.event == teamInfo.gameweek})
                            .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2))
                            .map((fixture) => { return <FixtureCard key={fixture.code} fixture={fixture} gameweekData={gameweekData.data} overviewData={props.overview}/> })     
            }
          </ScrollView>
      }
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    gameweekButton: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'center'
    },

  });

export default FixturesView;