import { Units } from '../types/weather';

export const convertTemp = (temp: number, units: Units): number => {
   if (units === 'imperial') {
      return Math.round((temp * 9) / 5 + 32); // в Фаренгейты
   }
   return Math.round(temp); // в Цельсии
};

export const convertSpeed = (speed: number, units: Units): number => {
   if (units === 'imperial') {
      return Math.round(speed * 0.621371); // в mph
   }
   return Math.round(speed); // в km/h
};

export const convertPrecipitation = (precip: number, units: Units): number => {
   if (units === 'imperial') {
      return Math.round(precip * 0.0393701 * 100) / 100; // в дюймы
   }
   return precip; // в мм
};

// Функция для получения иконки по коду погоды
export const getWeatherIcon = (weatherCode: number): string => {
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
