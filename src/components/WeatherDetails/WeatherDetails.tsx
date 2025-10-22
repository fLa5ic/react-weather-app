import React from 'react';
import { useWeather } from '../../context/WeatherContext';

import styles from './WeatherDetails.module.scss';

const WeatherDetails: React.FC = () => {
  const { weatherData, units, convertTemp, convertSpeed, convertPrecipitation } = useWeather();

  const humidity = weatherData?.current?.relative_humidity_2m;
  const feelsLike = convertTemp(weatherData?.current?.apparent_temperature);
  const precipitation = convertPrecipitation(weatherData?.current?.precipitation);
  const wind = convertSpeed(weatherData?.current?.wind_speed_10m);

  return (
    <div className={styles.weatherDetails}>
      <div className={styles.item}>
        <div className={styles.title}>Feels Like</div>
        <span>{feelsLike !== undefined ? `${feelsLike}°` : '--'}</span>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Humidity</div>
        <span>{humidity !== undefined ? `${humidity}%` : '--'}</span>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Wind</div>
        <span>{wind !== undefined ? `${wind} ${units === 'metric' ? 'km/h' : 'mph'}` : '--'}</span>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Precipitation</div>
        <span>
          {precipitation !== undefined
            ? `${precipitation} ${units === 'metric' ? 'mm' : 'in'}`
            : '--'}
        </span>
      </div>
    </div>
  );
};
export default WeatherDetails;
