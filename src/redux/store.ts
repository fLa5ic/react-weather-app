import { configureStore } from '@reduxjs/toolkit';

import weather from './slices/weatherSlice';

import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { weather },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
