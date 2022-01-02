import { configureStore } from '@reduxjs/toolkit'
import { fplSlice } from './fplSlice'

export const store = configureStore({
  reducer: {
    [fplSlice.reducerPath]: fplSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(fplSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;