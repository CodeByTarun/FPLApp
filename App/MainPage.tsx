import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Image, ActivityIndicator } from 'react-native';
import FixturesView from './Features/Fixtures/Fixtures';
import * as GlobalConstants from './Global/GlobalConstants'
import { useGetFixturesQuery, useGetOverviewQuery } from './Store/fplSlice';
import { useAppSelector } from "./Store/hooks";
import { ScreenTypes } from "./Store/navigationSlice";
import ModalNavigator from "./Modals/ModalNavigator";
import { LineupViewQueriesContainer } from "./Features/LineupView";
import PlayerStats from "./Features/PlayerStats";
import FixturesContainer from "./Features/Fixtures/FixturesContainer";
import BottomTabs from "./Features/BottomTabs";
import { LoadingIndicator } from "./Features/Controls";
import globalStyles from "./Global/GlobalStyles";
import * as SplashScreen from "expo-splash-screen";

const MainPage = () => {

  const overview = useGetOverviewQuery();
  const fixtures = useGetFixturesQuery();

  useEffect( function refetchFixtures() {
    if (fixtures.isError) {
      setTimeout(() => { fixtures.refetch() }, 30000);
    }
  }, [fixtures.isError]);

  useEffect( function refetchOverview() {
    if (overview.isError) {
      setTimeout(() => { overview.refetch() }, 30000);
    }
  }, [overview.isError]);

  useEffect( function showSplashScreenWhileFetchingData() {
    SplashScreen.preventAutoHideAsync();
  }, [])

  useEffect( function removeSplashScreen() {

    if (fixtures.isSuccess && overview.isSuccess) {
      setTimeout(() => SplashScreen.hideAsync(), 2000);
    }

  }, [fixtures.isSuccess, overview.isSuccess]);

  return (
    <View style={{flex: 1, backgroundColor: GlobalConstants.primaryColor}}>
      { (fixtures.isSuccess && overview.isSuccess) ?
        <>
          <SafeAreaView style={styles.safeArea}>
                <View style={{flex: 1, overflow: 'hidden'}}>
                  <View style={styles.fixturesView}/>
                    <FixturesContainer overview={overview.data} fixtures={fixtures.data}/>
                  <View style={styles.lineupView}>
                    <LineupViewQueriesContainer overview={overview.data} fixtures={fixtures.data}/>
                  </View>
                  <PlayerStats overview={overview.data} fixtures={fixtures.data}/>
                  <View style={{}}>
                    <BottomTabs/>
                  </View>
                </View>
          </SafeAreaView>

          {(overview.data && fixtures.data) &&
            <ModalNavigator overview={overview.data} fixtures={fixtures.data}/>
          }
        </> :
        <View style={styles.splashScreenContainer}>
          <Image style={styles.splashScreenImage} source={require('../assets/splash.png')} resizeMode={'contain'}/>
              <View style={[{backgroundColor: GlobalConstants.secondaryColor, position: 'absolute', top: '62%', padding: 5, width: '80%'}, globalStyles.shadow]}>
                <Text style={{ alignSelf: 'center', textAlign: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.largeFont, fontWeight: '600' }}> 
                    There has been an error retrieving data from the FPL API. Try reopening the app later.
                </Text>
              </View>
        </View> 
      }
    </View>
  )
}

const styles = StyleSheet.create({
  
  safeArea: {
    backgroundColor: GlobalConstants.primaryColor,
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  fixturesView: {
    height: GlobalConstants.FIXTURES_VIEW_HEIGHT, 
    width: '100%', 
    overflow: 'hidden',
  },

  lineupView: {
    flex: 1,
    overflow: 'hidden'
  },
  
  splashScreenContainer: {
    height: '100%', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    zIndex: 1, 
    elevation: 1,  
    backgroundColor: GlobalConstants.primaryColor
  },

  splashScreenImage: {
    position: 'absolute', 
    height: '93%',
    width: '100%', 
    top: '5%'
  },

  loadingText: {
    fontSize: GlobalConstants.largeFont * 1.2,
    color: GlobalConstants.lightColor,
    fontWeight: '500',
  }
  
});

export default MainPage;
