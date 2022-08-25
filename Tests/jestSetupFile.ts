import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler/jestSetup';
import { Globals } from '@react-spring/native';
import fetchMock from 'jest-fetch-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

Globals.assign({
    skipAnimation: true,  
});

// This way its available for all tests but not enabled by default (can choose when to mock fetch)
fetchMock.enableMocks();
fetchMock.dontMock();

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
  
    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};
  
    return Reanimated;
  });
  
  // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');