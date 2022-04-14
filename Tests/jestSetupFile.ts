import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import fetchMock from 'jest-fetch-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// This way its available for all tests but not enabled by default (can choose when to mock fetch)
fetchMock.enableMocks();
fetchMock.dontMock();