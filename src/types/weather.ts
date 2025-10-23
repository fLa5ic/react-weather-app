// Types for Open-Meteo API response

export interface City {
  name: string;
  lat: number;
  lon: number;
}

export type Units = 'metric' | 'imperial';

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  weather_code: number;
  precipitation: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}
