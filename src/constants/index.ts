import { City } from '../types/weather';

// Popular cities for quick selection
export const CITIES: City[] = [
  { name: 'Minsk, Belarus', lat: 53.9045, lon: 27.5615 },
  { name: 'Berlin, Germany', lat: 52.5244, lon: 13.4105 },
  { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
  { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
  { name: 'Madrid, Spain', lat: 40.4168, lon: -3.7038 },
  { name: 'Rome, Italy', lat: 41.9028, lon: 12.4964 },
  { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6173 },
];

// Days of the week (short format)
export const DAYS_OF_WEEK_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Days of the week (full format)
export const DAYS_OF_WEEK_FULL = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Default city
export const DEFAULT_CITY = 'Minsk, Belarus';
export const DEFAULT_CITY_LAT = 53.9045;
export const DEFAULT_CITY_LON = 27.5615;
