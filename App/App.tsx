import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './Store/store'
import { useGetOverviewQuery } from './Store/fplSlice';
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
