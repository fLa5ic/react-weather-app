import React from 'react';

import styles from './DailyForecast.module.scss';

type DailyForecastProps = {
  day: string;
  image: string;
  maxTemp: string;
  minTemp: string;
};

const DayilyForecast: React.FC<DailyForecastProps> = ({ day, image, maxTemp, minTemp }) => {
  return (
    <div className={styles.item}>
      <div className={styles.day}>{day}</div>
      <img src={image} alt="Drizzle" />
      <div className={styles.temperature}>
        <span className={styles.maxTemp}>{maxTemp}</span>
        <span className={styles.minTemp}>{minTemp}</span>
      </div>
    </div>
  );
};
export default DayilyForecast;
