import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { getWeatherIconSrc } from '../../utils/weatherIcons';
import { DAYS_OF_WEEK_SHORT } from '../../constants';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './DailyForecast.module.scss';

const DayilyForecast: React.FC = () => {
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  
  const { getWeatherIcon, convertTemp } = useWeather();

  const dailyData = weatherData?.daily;

  if (!dailyData) {
    return <div>Loading daily forecast...</div>;
  }

  return (
    <>
      {dailyData.time.map((dateString: string, index: number) => {
        const date = new Date(dateString);
        const dayName = DAYS_OF_WEEK_SHORT[date.getDay()];
        const weatherCode = dailyData.weather_code[index];
        const weatherIconSrc = getWeatherIconSrc(weatherCode, getWeatherIcon);

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
