import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import GlobalStyles from "../../Global/GlobalStyles";
import FixtureCard from './FixtureCard'
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { useGetFixturesQuery, useGetOverviewQuery, } from '../../App/fplSlice'
import * as GlobalConstants from '../../Global/GlobalConstants'
import { FplOverview } from "../../Models/FplOverview";
import RNPickerSelect from 'react-native-picker-select';


interface FixturesViewProp {
  overview: FplOverview|undefined;
}

const FixturesView = (prop: FixturesViewProp) => {

  const liveGameweek = prop.overview?.events.filter((event) => { return event.is_current == true; })[0].id;
  const [gameweekNumber, setGameweekNumber] = useState(liveGameweek);
  const fixtures = useGetFixturesQuery();

  useEffect(() => {

  })

  return (
    <View style={styles.container}>
      <View style={styles.gameweekView}>

        <RNPickerSelect 
            value = { gameweekNumber }
            onValueChange={(value) => setGameweekNumber(value)} 
            style={pickerSelectStyles}
            items = {
              prop.overview!.events.map((event) => {
              return { label: event.name, value:event.id}
            })
            }/>

      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fixturesView}>
        {(fixtures.data !== undefined) &&
          <FixtureCard overview={prop.overview} fixture={fixtures.data[30]}/>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingRight:5,
    },

    gameweekView: {
      height:30,
      margin: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 5,
    },

    fixturesView: {
      flex: 1,
    },

    arrow: {
      height: '40%',
      width:'15%',
    },
  });

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: GlobalConstants.width*0.04,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: GlobalConstants.textPrimaryColor,
    borderRadius: GlobalConstants.cornerRadius,
    backgroundColor: GlobalConstants.secondayColor,
  },
  inputAndroid: {
    fontSize: GlobalConstants.width*0.04,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: GlobalConstants.textPrimaryColor,
    borderRadius: GlobalConstants.cornerRadius,
    backgroundColor: GlobalConstants.secondayColor,
  },
})

export default FixturesView;