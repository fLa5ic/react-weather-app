import React from 'react';
import { useWeather } from '../../context/WeatherContext';
// Импортируем все иконки
import sunnySvg from '../../assets/images/icon-sunny.webp';
import partlyCloudySvg from '../../assets/images/icon-partly-cloudy.webp';
import overcastSvg from '../../assets/images/icon-overcast.webp';
import drizzleSvg from '../../assets/images/icon-drizzle.webp';
import rainSvg from '../../assets/images/icon-rain.webp';
import snowSvg from '../../assets/images/icon-snow.webp';
import stormSvg from '../../assets/images/icon-storm.webp';
import fogSvg from '../../assets/images/icon-fog.webp';
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

  // Получаем имя иконки и импортируем её
  const getWeatherIconSrc = (code: number) => {
    const iconName = getWeatherIcon(code);
    const iconMap: { [key: string]: string } = {
      'icon-sunny.webp': sunnySvg,
      'icon-partly-cloudy.webp': partlyCloudySvg,
      'icon-overcast.webp': overcastSvg,
      'icon-drizzle.webp': drizzleSvg,
      'icon-rain.webp': rainSvg,
      'icon-snow.webp': snowSvg,
      'icon-storm.webp': stormSvg,
      'icon-fog.webp': fogSvg,
    };
    return iconMap[iconName] || sunnySvg;
  };

  const weatherIconSrc = weatherCode ? getWeatherIconSrc(weatherCode) : sunnySvg;

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
