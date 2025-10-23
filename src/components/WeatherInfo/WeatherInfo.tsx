import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { getWeatherIconSrc } from '../../utils/weatherIcons';
import styles from './WeatherInfo.module.scss';

const WeatherInfo: React.FC = () => {
  const { currentCity, weatherData, getWeatherIcon, convertTemp } = useWeather();

  // Теперь получаем данные из weatherData, а не из пропсов
  const temp = weatherData?.current?.temperature_2m || 0;
  const weatherCode = weatherData?.current?.weather_code;
  const date = weatherData?.current?.time;

  const formatDate = (dateString?: string) => {
    const dateToUse = dateString ? new Date(dateString) : new Date();
    return dateToUse.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const weatherIconSrc = weatherCode ? getWeatherIconSrc(weatherCode, getWeatherIcon) : '';

  return (
    <div className={styles.weatherInfo}>
      <div className={styles.cityAndDate}>
        <div className={styles.title}>{currentCity}</div>
        <div className={styles.date}>{formatDate(date)}</div>
      </div>
      <div className={styles.temperature}>
        <img src={weatherIconSrc} width={120} alt="Weather" />
        {convertTemp(temp)}°
      </div>
    </div>
  );
};
export default WeatherInfo;
