import React, { createContext, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import store from './App/Store/store'
import MainPage from './App/MainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGetOverviewQuery, useGetFixturesQuery } from './App/Store/fplSlice';
import * as SplashScreen from "expo-splash-screen";
import { FplFixture } from './App/Models/FplFixtures';
import { FplOverview } from './App/Models/FplOverview';
import { FplBaseDataContext } from './App/AppContext';

export type RootStackParams = {
  Home: undefined;
}

const Stack = createNativeStackNavigator<RootStackParams>();

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
          <Stack.Screen name="Home" component={MainPage} options={{headerShown: false}}/>
          <Stack.Group screenOptions={{ presentation: 'transparentModal', 
                                        contentStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </FplBaseDataContext.Provider>
  );
}

export default AppWrapper;