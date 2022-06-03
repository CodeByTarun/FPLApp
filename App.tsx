import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './App/Store/store'
import MainPage from './App/MainPage';

function App() {

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

export default App;