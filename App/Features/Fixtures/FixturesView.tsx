import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
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
  const [gameweekNumber, setGameweekNumber] = useState(liveGameweek);
  const fixtures = useGetFixturesQuery();
  const gameweekData = useGetGameweekDataQuery((gameweekNumber) ? gameweekNumber : skipToken);

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

      let sortedGameweekFixtures: FplFixture[] | undefined = fixtures.data?.filter((fixture) => { return fixture.event == gameweekNumber})
                                                                           .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2));

      if (sortedGameweekFixtures !== undefined) {

        if (sortedGameweekFixtures[0].started === true) {
          dispatch(changingFixtureWhenGameweekChanged(sortedGameweekFixtures[0]))
        } 
        else {
          dispatch(removeFixture())
        }                              
      }
    }, [gameweekNumber]);

  useEffect( function gameweekChanged() {
    if (gameweekNumber) dispatch(changeGameweek(gameweekNumber));
  }, [gameweekNumber])

  useEffect(
    function refetchLiveGameweekData() {
      let refetchFixture: NodeJS.Timer;
      let refetchGameweek: NodeJS.Timer;

      if (gameweekNumber !== undefined && fixtures.data !== undefined) {
        if (gameweekNumber === liveGameweek && IsThereAMatchInProgress(gameweekNumber, fixtures.data)) {
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
    }, [gameweekNumber]);

    const onInfoButtonPress = useCallback(() => {

    }, [])

    const onPlayerTableButtonPress = useCallback(() => {

    }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        {props.overview && 

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={[styles.gameweekButton, globalStyles.shadow]}>
              <Text style={{color: GlobalConstants.textPrimaryColor, alignSelf: 'center', fontSize: GlobalConstants.mediumFont, fontWeight: '700'}}>Gameweek {gameweekNumber}</Text>
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View style={{height: '80%', aspectRatio: 1}}>
                <CustomButton image="table" buttonFunction={onPlayerTableButtonPress}/>
              </View>
            </View>
          </View>  
          
          // <Dropdown value={ gameweekNumber }
          //           setValue={ setGameweekNumber }
          //           defaultValue = { liveGameweek }
          //           options = { prop.overview.events.map((event) => {
          //                         return { label: event.name, value:event.id}
          //                     })}/>
        }
      </View>
      { (fixtures.isSuccess == true) &&
        <View style={{flex: 3.5}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, marginLeft: 2.5, marginRight: 2.5 }}>
            { (fixtures.data && gameweekData.data && props.overview) &&

              fixtures.data.filter((fixture) => { return fixture.event == gameweekNumber})
                            .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2))
                            .map((fixture) => { return <FixtureCard key={fixture.code} fixture={fixture} gameweekData={gameweekData.data} overviewData={props.overview}/> })     
            }
          </ScrollView>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      height: GlobalConstants.height * 0.16,
      width: GlobalConstants.width,
    },

    gameweekButton: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: GlobalConstants.primaryColor,
      borderRadius: GlobalConstants.cornerRadius,
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center'
    },

  });

export default FixturesView;