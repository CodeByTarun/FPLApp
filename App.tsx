import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FixturesView from './Features/Fixtures/FixturesView';
import PlayerSearch from './Features/PlayerStats/PlayerSearch';
import LineupContainer from './Features/GameStats/LineupContainer';
import { Provider } from 'react-redux';
import store from './App/store'
import { useGetOverviewQuery } from './App/fplSlice';
import MainPage from './MainPage';

export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainPage/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
});
