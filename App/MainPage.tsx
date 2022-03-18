import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import FixturesView from './Features/Fixtures/FixturesView';
import PlayerSearch from './Features/PlayerStats/PlayerSearch';
import LineupContainer from './Features/GameStats/LineupContainer';
import * as GlobalConstants from './Global/GlobalConstants'
import { useGetFixturesQuery, useGetOverviewQuery } from './Store/fplSlice';
import { FplFixture } from "./Models/FplFixtures";
import PlayerDetailedStatsModal from "./Features/PlayerStats/PlayerDetailedStatsModal";

const MainPage = () => {

    const overview = useGetOverviewQuery();
    const fixtures = useGetFixturesQuery();

    useEffect( function refetchFixtures() {
      if (fixtures.isError) {
        setTimeout(() => { fixtures.refetch() }, 30000);
      }
    }, [fixtures.isError])

    useEffect( function refetchOverview() {
      if (overview.isError) {
        setTimeout(() => { overview.refetch() }, 30000);
      }
    }, [overview.isError])

    return (
      <View style={{flex: 1, backgroundColor: GlobalConstants.primaryColor}}>
        <SafeAreaView style={styles.safeArea}>
            {(overview.data && fixtures.data) &&
              <><View style={{}}>
                  <FixturesView overview={overview.data} />
                </View>
                <View style={styles.lineupView}>
                  <LineupContainer overview={overview.data} fixtures={fixtures.data}/>
                </View>
                <PlayerSearch overview={overview.data} fixtures={fixtures.data}/>
                
                <PlayerDetailedStatsModal overview={overview.data} fixtures={fixtures.data}/>
              </> 
            }

            {(fixtures.isError || overview.isError) && 
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30}}> 
                <Text style={{ alignSelf: 'center', textAlign: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.largeFont, fontWeight: '600' }}> 
                  Please reopen the app once the gameweek has been processed by the FPL API. 
                </Text>
              </View>
            }
        </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  
  safeArea: {
    backgroundColor: GlobalConstants.primaryColor,
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  lineupView: {
    flex: 10,
  },    
});

export default MainPage;
