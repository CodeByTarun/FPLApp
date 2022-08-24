import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import store from './App/Store/store'
import MainPage from './App/MainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGetOverviewQuery, useGetFixturesQuery } from './App/Store/fplSlice';
import * as SplashScreen from "expo-splash-screen";
import { FplBaseDataContext, ManageThemeContext } from './App/AppContext';
import PlayerModal from './App/Modals/PlayerModal';
import SettingsModal from './App/Modals/SettingsModal';
import PlayerDetailedStatsModal from './App/Modals/PlayerDetailedStatsModal';
import PlayerComparisonModal from './App/Modals/PlayerComparisonModal';
import TeamModal from './App/Modals/TeamModal';
import GameweekOverviewModal from './App/Modals/GameweekOverviewModal';
import MutableModal from './App/Modals/MutableModal';
import FilterModal from './App/Modals/FilterModal';
import { FplFixture } from './App/Models/FplFixtures';
import { Appearance, useColorScheme } from 'react-native';
import { darkTheme, defaultTheme } from './App/Global/GlobalConstants';
import { getThemeData, setThemeData } from './App/Helpers/FplDataStorageService';
import TeamFixtureDifficulty from './App/Modals/GameweekOverviewModal/TeamFixtureDifficulty';

export interface FixturesMap {
  [key: number] : FplFixture[];
}

export type RootStackParams = {
  Home: any;
  SettingsModal: any;
  PlayerModal: any;
  PlayerDetailedStatsModal: any;
  PlayerComparisonModal: any;
  TeamModal: any;
  GameweekOverview: any;
  MutableModal: any;
  FilterModal: any;
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
  const [fixtureLists, setFixtureLists] = useState({} as FixturesMap);
  const [teamFixtureDifficultyView, setTeamFixtureDifficultyView] = useState({} as JSX.Element);
  const errorCount = useRef(0);

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState('light');
  const [useDeviceTheme, setUseDeviceTheme] = useState(false);

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
  }, []);

  useEffect(function gettingThemeDataFromAsyncStorage() {
    async function getThemeDataFromStorage() {
      let themeData = await getThemeData();
      if (themeData) {
        if (themeData.useDeviceTheme) {
          if (colorScheme) {
            setTheme(colorScheme);
            setUseDeviceTheme(true);
          }
        }
        else {
          setTheme(themeData.theme);
        }
      }
    }

    getThemeDataFromStorage();
  }, []);

  useEffect(function useDevicesThemeChanged() {

    if (useDeviceTheme) {
        let deviceTheme = Appearance.getColorScheme();

        if (deviceTheme) {
            setThemeData({
                theme: deviceTheme,
                useDeviceTheme: true,
            });

            setTheme(deviceTheme);
        }
        else {
            setThemeData({
                theme: theme,
                useDeviceTheme: false,
            });
        }

    }
    else {
        setThemeData({
            theme: theme,
            useDeviceTheme: false,
        });
    }

}, [useDeviceTheme]);

useEffect(function themeChanged() {
  if (!useDeviceTheme) {
    setThemeData({
      theme: theme,
      useDeviceTheme: false,
    })
  }
}, [theme])

  useEffect( function removeSplashScreen() {

    if (fixtures.isSuccess && overview.isSuccess) {

      let liveGameweek = overview.data.events.filter((event) => { return event.is_current === true; })[0]?.id;

      let gettingFixtureLists = {} as FixturesMap;
      
      overview.data.teams.map(team => {
        gettingFixtureLists[team.id] = fixtures.data.filter((fixture) => (fixture.team_a === team.id || fixture.team_h === team.id) && (fixture.event && fixture.event > liveGameweek)); 
      })

      setFixtureLists(gettingFixtureLists);

      setTimeout(() => SplashScreen.hideAsync(), 2000);
    }

  }, [fixtures.isSuccess, overview.isSuccess]);

  useEffect(function createTeamFixtureDifficultyView() {
    setTeamFixtureDifficultyView(<TeamFixtureDifficulty/>);
  }, [fixtureLists])

  if (overview.isSuccess && fixtures.isSuccess) 
    return (
        <FplBaseDataContext.Provider value={{ overview: overview.data, fixtures: fixtures.data, fixtureLists: fixtureLists, TeamFixtureDifficultyView: teamFixtureDifficultyView}}>
          <ManageThemeContext.Provider value={{theme: theme, useDeviceTheme: useDeviceTheme, setTheme: setTheme, setUseDeviceTheme: setUseDeviceTheme }}>
            <NavigationContainer theme={(theme === 'dark') ? darkTheme : defaultTheme}>
              <Stack.Navigator initialRouteName='Home'>
                <Stack.Group>
                  <Stack.Screen name="Home" component={MainPage} options={{headerShown: false}}/>
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'transparentModal', headerShown: false }}>
                  <Stack.Screen name="SettingsModal" component={SettingsModal}/>
                  <Stack.Screen name="PlayerModal" component={PlayerModal}/>
                  <Stack.Screen name="PlayerDetailedStatsModal" component={PlayerDetailedStatsModal}/>
                  <Stack.Screen name="PlayerComparisonModal" component={PlayerComparisonModal}/>
                  <Stack.Screen name="TeamModal" component={TeamModal}/>
                  <Stack.Screen name="GameweekOverview" component={GameweekOverviewModal}/>
                  <Stack.Screen name="MutableModal" component={MutableModal}/>
                  <Stack.Screen name="FilterModal" component={FilterModal}/>
                </Stack.Group>
              </Stack.Navigator>
            </NavigationContainer>
          </ManageThemeContext.Provider>
        </FplBaseDataContext.Provider>
    );
  else return null;
}

export default AppWrapper;

