import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { WeatherData } from '../../types/weather';

const initialState: WeatherSliceState = {
   weaterData: any,
};

const weatherSlice = createSlice({
   name: 'weather',
   initialState,
   reducers: {},
});

export const {} = weatherSlice.actions;
export default weatherSlice.reducer;
