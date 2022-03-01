import { configureStore } from '@reduxjs/toolkit'
import { fplSlice } from './fplSlice'
import teamReducer from './teamSlice'
import modalReducer from './modalSlice'

export const store = configureStore({
  reducer: {
    team: teamReducer,
    modal: modalReducer,
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