import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler/jestSetup';
import { Globals } from '@react-spring/native';
import fetchMock from 'jest-fetch-mock';
import { defaultTheme } from '../App/Global/GlobalConstants';
import { StackCardInterpolationProps } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

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

export const mockedNavigation = jest.fn();
export const mockedNavigationGoBack = jest.fn();

const mockedTheme = defaultTheme;
const mockedCardAnimation = {
                              current: null, closing: 1,
                              index: 1, insets: { top: 0, bottom: 0, left: 0, right: 0 }, inverted: false,
                              layouts: {}, swiping: 0, next: undefined
                            } as unknown as StackCardInterpolationProps

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigation,
      goBack: mockedNavigationGoBack,
    }),
    useTheme: () => mockedTheme,
  };
});

jest.mock('@react-navigation/stack', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useCardAnimation: () => mockedCardAnimation,
  };
});
