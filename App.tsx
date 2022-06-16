import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import store from './App/Store/store'
import MainPage from './App/MainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGetOverviewQuery, useGetFixturesQuery } from './App/Store/fplSlice';
import * as SplashScreen from "expo-splash-screen";
import { FplBaseDataContext } from './App/AppContext';
import InfoModal from './App/Modals/InfoModalTest';
import { StackCardInterpolatedStyle, StackCardInterpolationProps, StackCardStyleInterpolator, TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { ViewStyle } from 'react-native';

export type RootStackParams = {
  Home: any;
  InfoModal: any;
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
          <Stack.Group screenOptions={{ presentation: 'transparentModal', headerShown: false, animationEnabled: false }}>
            <Stack.Screen name='InfoModal' component={InfoModal}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </FplBaseDataContext.Provider>
  );
}

export default AppWrapper;

