import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { useWeather } from '../../context/WeatherContext';

import styles from './WeatherDetails.module.scss';

const WeatherDetails: React.FC = () => {
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  const units = useSelector((state: RootState) => state.weather.units);

  const { convertTemp, convertSpeed, convertPrecipitation } = useWeather();

  const humidity = weatherData?.current?.relative_humidity_2m;
  const feelsLike =
    weatherData?.current?.apparent_temperature !== undefined
      ? convertTemp(weatherData.current.apparent_temperature)
      : undefined;
  const precipitation =
    weatherData?.current?.precipitation !== undefined
      ? convertPrecipitation(weatherData.current.precipitation)
      : undefined;
  const wind =
    weatherData?.current?.wind_speed_10m !== undefined
      ? convertSpeed(weatherData.current.wind_speed_10m)
      : undefined;

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
