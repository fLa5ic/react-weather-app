import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WeatherData, Units } from '../../types/weather';

import { DEFAULT_CITY } from '../../constants';

// Интерфейс для всего стейта слайса
interface WeatherSliceState {
  units: Units;
  weatherData: WeatherData | null;
  currentCity: string;
  searchHistory: string[];
  selectedDayIndex: number;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherSliceState = {
  units: 'metric',
  weatherData: null,
  currentCity: DEFAULT_CITY,
  searchHistory: [],
  selectedDayIndex: 0,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnits(state, action: PayloadAction<Units>) {
      state.units = action.payload;
    },
    setWeatherData(state, action: PayloadAction<WeatherData | null>) {
      state.weatherData = action.payload;
    },
    setCurrentCity(state, action: PayloadAction<string>) {
      state.currentCity = action.payload;
    },
    setSearchHistory(state, action: PayloadAction<string[]>) {
      state.searchHistory = action.payload;
    },
    setSelectedDayIndex(state, action: PayloadAction<number>) {
      state.selectedDayIndex = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUnits, setWeatherData, setCurrentCity, setSearchHistory, setSelectedDayIndex, setLoading, setError } = weatherSlice.actions;
export default weatherSlice.reducer;
