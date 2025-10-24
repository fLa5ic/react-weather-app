import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { useWeather } from '../../context/WeatherContext';
import { getWeatherIconSrc } from '../../utils/weatherIcons';
import styles from './HourlyForecastItem.module.scss';

const HourlyForecastItem: React.FC = () => {
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  const selectedDayIndex = useSelector((state: RootState) => state.weather.selectedDayIndex);
  
  const { getWeatherIcon, convertTemp } = useWeather();

  const hourlyData = weatherData?.hourly;

  if (!hourlyData) {
    return <div>Loading hourly data...</div>;
  }

  // Фильтруем часы для выбранного дня
  const getHoursForSelectedDay = () => {
    const hoursPerDay = 24;
    const startIndex = selectedDayIndex * hoursPerDay;
    const endIndex = startIndex + hoursPerDay;

    return hourlyData.time.slice(startIndex, endIndex).map((time: string, index: number) => {
      const globalIndex = startIndex + index;
      return {
        time: new Date(time).toLocaleTimeString('en-US', {
          hour: 'numeric',
          hour12: true,
        }),
        temperature: convertTemp(hourlyData.temperature_2m[globalIndex]),
        weatherCode: hourlyData.weather_code[globalIndex],
      };
    });
  };

  const hoursForDay = getHoursForSelectedDay();

  // Берем только часы с 3 PM до 10 PM (15:00 - 22:00)
  const eveningHours = hoursForDay.filter((_: any, index: number) => index >= 15 && index <= 22);

  return (
    <>
      {eveningHours.map(
        (hour: { time: string; temperature: number; weatherCode: number }, index: number) => {
          const weatherIconSrc = getWeatherIconSrc(hour.weatherCode, getWeatherIcon);
          return (
            <div key={index} className={styles.hourlyForecastItem}>
              <div className={styles.time}>
                <img src={weatherIconSrc} width={40} alt="WeatherImg" />
                <span>{hour.time}</span>
              </div>
              <p className={styles.temperature}>{hour.temperature}°</p>
            </div>
          );
        },
      )}
    </>
  );
};

export default HourlyForecastItem;
