import React from 'react';
import { useWeather } from '../../context/WeatherContext';
// Импортируем все иконки как в WeatherInfo
import sunnySvg from '../../assets/images/icon-sunny.webp';
import partlyCloudySvg from '../../assets/images/icon-partly-cloudy.webp';
import overcastSvg from '../../assets/images/icon-overcast.webp';
import drizzleSvg from '../../assets/images/icon-drizzle.webp';
import rainSvg from '../../assets/images/icon-rain.webp';
import snowSvg from '../../assets/images/icon-snow.webp';
import stormSvg from '../../assets/images/icon-storm.webp';
import fogSvg from '../../assets/images/icon-fog.webp';
import styles from './DailyForecast.module.scss';

const DayilyForecast: React.FC = () => {
  const { weatherData, getWeatherIcon, convertTemp } = useWeather();

  const dailyData = weatherData?.daily;

  if (!dailyData) {
    return <div>Loading daily forecast...</div>;
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Функция для получения иконки (аналогично WeatherInfo)
  const getWeatherIconSrc = (weatherCode: number) => {
    const iconName = getWeatherIcon(weatherCode);
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

  return (
    <>
      {dailyData.time.map((dateString: string, index: number) => {
        const date = new Date(dateString);
        const dayName = daysOfWeek[date.getDay()];
        const weatherCode = dailyData.weather_code[index];
        const weatherIconSrc = getWeatherIconSrc(weatherCode);

        return (
          <div key={dateString} className={styles.item}>
            <div className={styles.day}>{dayName}</div>
            <img src={weatherIconSrc} alt="Weather" />
            <div className={styles.temperature}>
              <span className={styles.maxTemp}>
                {convertTemp(dailyData.temperature_2m_max[index])}°
              </span>
              <span className={styles.minTemp}>
                {convertTemp(dailyData.temperature_2m_min[index])}°
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default DayilyForecast;
