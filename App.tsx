import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import store from './App/Store/store'
import MainPage from './App/MainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGetOverviewQuery, useGetFixturesQuery } from './App/Store/fplSlice';
import * as SplashScreen from "expo-splash-screen";
import { FplBaseDataContext } from './App/AppContext';
import PlayerModal from './App/Modals/PlayerModal';
import InfoModal from './App/Modals/InfoModal';
import PlayerDetailedStatsModal from './App/Modals/PlayerDetailedStatsModal';
import PlayerComparisonModal from './App/Modals/PlayerComparisonModal';
import TeamModal from './App/Modals/TeamModal';
import GameweekOverviewModal from './App/Modals/GameweekOverviewModal';
import ListModal from './App/Modals/ListModal';

export type RootStackParams = {
  Home: any;
  InfoModal: any;
  PlayerModal: any;
  PlayerDetailedStatsModal: any;
  PlayerComparisonModal: any;
  TeamModal: any;
  GameweekOverview: any;
  ListModal: any;
}

const Stack = createStackNavigator<RootStackParams>();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

function App() {

  const overview = useGetOverviewQuery();
  const fixtures = useGetFixturesQuery();
  const errorCount = useRef(0);

  useEffect( function refetchIfError() {
    if (errorCount.current < 3) {

      if (overview.isError) {
        setTimeout(() => { overview.refetch() }, 30000);
      }

      if (fixtures.isError) {
        setTimeout(() => { fixtures.refetch() }, 30000);
      }
    } 
    else {
      SplashScreen.hideAsync();
    }

    errorCount.current = errorCount.current++;
  }, [overview.isError, fixtures.isError]);

  useEffect( function showSplashScreenWhileFetchingData() {
    SplashScreen.preventAutoHideAsync();
  }, [])

  useEffect( function removeSplashScreen() {

    if (fixtures.isSuccess && overview.isSuccess) {
      setTimeout(() => SplashScreen.hideAsync(), 2000);
    }

  }, [fixtures.isSuccess, overview.isSuccess]);

  return (
    <FplBaseDataContext.Provider value={{ overview: overview.data, fixtures: fixtures.data}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Group>
            <Stack.Screen name="Home" component={MainPage} options={{headerShown: false}}/>
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'transparentModal', headerShown: false }}>
            <Stack.Screen name="InfoModal" component={InfoModal}/>
            <Stack.Screen name="PlayerModal" component={PlayerModal}/>
            <Stack.Screen name="PlayerDetailedStatsModal" component={PlayerDetailedStatsModal}/>
            <Stack.Screen name="PlayerComparisonModal" component={PlayerComparisonModal}/>
            <Stack.Screen name="TeamModal" component={TeamModal}/>
            <Stack.Screen name="GameweekOverview" component={GameweekOverviewModal}/>
            <Stack.Screen name="ListModal" component={ListModal}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </FplBaseDataContext.Provider>
  );
}

export default AppWrapper;

