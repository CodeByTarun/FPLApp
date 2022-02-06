import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FixturesView from './Features/Fixtures/FixturesView';
import PlayerSearch from './Features/PlayerStats/PlayerSearch';
import LineupContainer from './Features/GameStats/LineupContainer';
import * as GlobalConstants from './Global/GlobalConstants'
import { useGetFixturesQuery, useGetOverviewQuery } from './Store/fplSlice';

const MainPage = () => {

    const overview = useGetOverviewQuery();
    const fixtures = useGetFixturesQuery();
    
    return (
        <SafeAreaView style={styles.safeArea}>
            {(overview.isSuccess == true && fixtures.isSuccess) &&
              <><View style={styles.fixturesView}>
                  <FixturesView overview={overview.data} />
                </View>
                <View style={styles.lineupView}>
                  <LineupContainer />
                </View>
                <View style={{ flex: 1 }}></View>
                <PlayerSearch />
                </>
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
    },

    fixturesView: {
      flex: 2,
    },

    lineupView: {
      flex: 10,
    },    
  });

  export default MainPage;
