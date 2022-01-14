import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FixturesView from './Features/Fixtures/FixturesView';
import PlayerSearch from './Features/PlayerStats/PlayerSearch';
import LineupContainer from './Features/GameStats/LineupContainer';
import * as GlobalConstants from './Global/GlobalConstants'
import { useGetFixturesQuery, useGetOverviewQuery } from './Store/fplSlice';

const MainPage = () => {

    const overview = useGetOverviewQuery();
    
    return (
        <SafeAreaView style={styles.safeArea}>
            {(overview.isSuccess == true) &&
              <><View style={styles.fixturesView}>
                  <FixturesView overview={overview.data} />
                </View>
                <View style={styles.playerSearchView}>
                  <PlayerSearch />
                </View>
                <View style={styles.lineupView}>
                  <LineupContainer />
                </View></>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      height: '100%'
    },
  
    safeArea: {
      backgroundColor: GlobalConstants.primaryColor,
      flex: 1,
      marginTop: '0%',
    },

    fixturesView: {
      flex: 2,
    },

    playerSearchView: {
      flex: 1,
    },
  
    lineupView: {
      flex: 10,
    },    
  });

  export default MainPage;
