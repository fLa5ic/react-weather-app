import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { City } from '../types/weather';
import { CITIES, DEFAULT_CITY_LAT, DEFAULT_CITY_LON } from '../constants';

import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../redux/store';

import {
  setWeatherData,
  setCurrentCity,
  setSearchHistory,
  setLoading,
  setError,
} from '../redux/slices/weatherSlice';

type WeatherContextType = {
  // States
  cities: City[];

  // Setters

  // Functions
  handleCityChange: (cityChange: string) => void;
  searchCity: (cityName: string) => Promise<void>;
  removeFromHistory: (cityToRemove: string) => void;
  getWeatherIcon: (weatherCode: number) => string;
  convertTemp: (temp: number) => number;
  convertSpeed: (speed: number) => number;
  convertPrecipitation: (precip: number) => number;
};

const WeatherContext = React.createContext<WeatherContextType | undefined>(undefined);

// Кастомный хук
export const useWeather = () => {
  const context = React.useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

// Provider component
export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const units = useSelector((state: RootState) => state.weather.units);
  const searchHistory = useSelector((state: RootState) => state.weather.searchHistory);

  const convertTemp = (temp: number): number => {
    if (units === 'imperial') {
      return Math.round((temp * 9) / 5 + 32); // в Фаренгейты
    }
    return Math.round(temp); // в Цельсии
  };

  const convertSpeed = (speed: number): number => {
    if (units === 'imperial') {
      return Math.round(speed * 0.621371); // в mph
    }
    return Math.round(speed); // в km/h
  };

  const convertPrecipitation = (precip: number): number => {
    if (units === 'imperial') {
      return Math.round(precip * 0.0393701 * 100) / 100; // в дюймы
    }
    return precip; // в мм
  };

  const fetchWeather = async (lat: number, lon: number) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=weather_code,temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`,
      );
      dispatch(setWeatherData(response.data));
      return true;
    } catch (error) {
      console.error('Ошибка:', error);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Функция для получения иконки по коду погоды
  const getWeatherIcon = (weatherCode: number): string => {
    const iconMap: { [key: number]: string } = {
      // Clear
      0: 'icon-sunny.webp',
      // Mainly clear, partly cloudy
      1: 'icon-partly-cloudy.webp',
      2: 'icon-partly-cloudy.webp',
      // Cloudy
      3: 'icon-overcast.webp',
      // Fog
      45: 'icon-fog.webp',
      48: 'icon-fog.webp',
      // Drizzle
      51: 'icon-drizzle.webp',
      53: 'icon-drizzle.webp',
      55: 'icon-drizzle.webp',
      // Rain
      61: 'icon-rain.webp',
      63: 'icon-rain.webp',
      65: 'icon-rain.webp',
      // Snow
      71: 'icon-snow.webp',
      73: 'icon-snow.webp',
      75: 'icon-snow.webp',
      // Storm
      95: 'icon-storm.webp',
      96: 'icon-storm.webp',
      99: 'icon-storm.webp',
    };

    return iconMap[weatherCode] || 'icon-sunny.webp'; // default
  };

  // Функция смены города
  const handleCityChange = async (cityName: string) => {
    const selectedCity = CITIES.find((city) => city.name === cityName);
    if (selectedCity) {
      dispatch(setCurrentCity(cityName));
      await fetchWeather(selectedCity.lat, selectedCity.lon);
      navigate('/');
    }
  };

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      dispatch(setSearchHistory(JSON.parse(savedHistory)));
    }
    // Загружаем погоду для дефолтного города при первом рендере
    fetchWeather(DEFAULT_CITY_LAT, DEFAULT_CITY_LON);
  }, []);

  const searchCity = async (cityName: string) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          cityName,
        )}&limit=1&accept-language=en`,
      );

      if (geoResponse.data.length > 0) {
        const { lat, lon, display_name } = geoResponse.data[0];

        const cityNameEn = display_name.split(',')[0];
        dispatch(setCurrentCity(cityNameEn));
        await fetchWeather(parseFloat(lat), parseFloat(lon));

        const newHistory = [cityName, ...searchHistory.filter((item) => item !== cityName)].slice(
          0,
          10,
        );
        localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
        dispatch(setSearchHistory(newHistory));
        navigate('/');
      } else {
        navigate('/not-found');
      }
    } catch (error) {
      navigate('/api-error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeFromHistory = (cityToRemove: string) => {
    const newHistory = searchHistory.filter((city) => city !== cityToRemove);
    localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
    dispatch(setSearchHistory(newHistory));
  };

  const value = {
    handleCityChange,
    searchCity,
    removeFromHistory,
    convertTemp,
    convertSpeed,
    convertPrecipitation,
    getWeatherIcon,
    cities: CITIES,
  };
  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};
