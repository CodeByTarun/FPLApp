import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Image } from 'react-native';
import * as GlobalConstants from './Global/GlobalConstants'
import ModalNavigator from "./Modals/ModalNavigator";
import { LineupViewQueriesContainer } from "./Features/LineupView";
import PlayerStats from "./Features/PlayerStats";
import FixturesContainer from "./Features/Fixtures/FixturesContainer";
import BottomTabs from "./Features/BottomTabs";
import globalStyles from "./Global/GlobalStyles";
import { FplBaseDataContext } from "./AppContext";

const MainPage = () => {

  const {overview, fixtures} = useContext(FplBaseDataContext)

  return (
    <View style={{flex: 1, backgroundColor: GlobalConstants.primaryColor}}>
      { (fixtures && overview) ?
        <>
          <SafeAreaView style={styles.safeArea}>
            <View style={{flex: 1, overflow: 'hidden'}}>
              <View style={styles.fixturesView}/>
                <FixturesContainer overview={overview} fixtures={fixtures}/>
              <View style={styles.lineupView}>
                <LineupViewQueriesContainer overview={overview} fixtures={fixtures}/>
              </View>
              <PlayerStats overview={overview} fixtures={fixtures}/>
              <View>
                <BottomTabs/>
              </View>
            </View>
          </SafeAreaView>
          <ModalNavigator overview={overview} fixtures={fixtures}/>
        </> :
        <View style={styles.splashScreenContainer}>
          <Image style={styles.splashScreenImage} source={require('../assets/splash.png')} resizeMode={'contain'}/>
              <View style={[{backgroundColor: GlobalConstants.secondaryColor, position: 'absolute', top: '62%', padding: 5, width: '80%'}, globalStyles.shadow]}>
                <Text style={{ alignSelf: 'center', textAlign: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.largeFont, fontWeight: '600' }}> 
                    There has been an error retrieving data from the FPL API. Try reopening the app later.
                </Text>
              </View >
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
