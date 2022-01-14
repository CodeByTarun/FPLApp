import { configureStore } from '@reduxjs/toolkit'
import { fplSlice } from './fplSlice'
import fixtureReducer from './fixtureSlice'

export const store = configureStore({
  reducer: {
    fixture: fixtureReducer,
    [fplSlice.reducerPath]: fplSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(fplSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;