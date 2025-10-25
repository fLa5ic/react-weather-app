import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherData, Units } from '../../types/weather';

import { DEFAULT_CITY } from '../../constants';

// 1. Thunk для загрузки погоды
export const fetchWeatherThunk = createAsyncThunk(
   'weather/fetchWeather',
   async ({ lat, lon }: { lat: number; lon: number }) => {
      const response = await axios.get(
         `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=weather_code,temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`,
      );
      return response.data;
   },
);

// 2. Thunk для поиска города
export const searchCityThunk = createAsyncThunk(
   'weather/searchCity',
   async (cityName: string, { rejectWithValue }) => {
      try {
         const geoResponse = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
               cityName,
            )}&limit=1&accept-language=en`,
         );

         if (geoResponse.data.length === 0) {
            return rejectWithValue('not-found');
         }

         const { lat, lon, display_name } = geoResponse.data[0];

         const weatherResponse = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=weather_code,temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`,
         );

         return {
            cityName: display_name.split(',')[0],
            weatherData: weatherResponse.data,
            searchedCity: cityName,
         };
      } catch (error) {
         return rejectWithValue('api-error');
      }
   },
);

// 3. Thunk для смены города из списка
export const changeCityThunk = createAsyncThunk(
   'weather/changeCity',
   async (
      { cityName, lat, lon }: { cityName: string; lat: number; lon: number },
      { rejectWithValue },
   ) => {
      try {
         const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=weather_code,temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`,
         );
         return { cityName, weatherData: response.data };
      } catch (error) {
         return rejectWithValue('api-error');
      }
   },
);

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
      removeFromHistory(state, action: PayloadAction<string>) {
         state.searchHistory = state.searchHistory.filter((city) => city !== action.payload);
      },
   },
   extraReducers: (builder) => {
      builder
         // fetchWeatherThunk
         .addCase(fetchWeatherThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchWeatherThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.weatherData = action.payload;
         })
         .addCase(fetchWeatherThunk.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch weather';
         })

         // searchCityThunk
         .addCase(searchCityThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(searchCityThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.currentCity = action.payload.cityName;
            state.weatherData = action.payload.weatherData;

            // Добавляем в историю
            const newHistory = [
               action.payload.searchedCity,
               ...state.searchHistory.filter((item) => item !== action.payload.searchedCity),
            ].slice(0, 10);
            state.searchHistory = newHistory;
         })
         .addCase(searchCityThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
         })

         // changeCityThunk
         .addCase(changeCityThunk.pending, (state) => {
            state.loading = true;
         })
         .addCase(changeCityThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.currentCity = action.payload.cityName;
            state.weatherData = action.payload.weatherData;
         })
         .addCase(changeCityThunk.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to change city';
         });
   },
});

export const {
   setUnits,
   setWeatherData,
   setCurrentCity,
   setSearchHistory,
   setSelectedDayIndex,
   setLoading,
   setError,
   removeFromHistory,
} = weatherSlice.actions;
export default weatherSlice.reducer;
