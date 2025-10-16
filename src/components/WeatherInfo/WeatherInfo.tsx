import React from 'react';
import sunnySvg from '../../assets/images/icon-sunny.webp';
import styles from './WeatherInfo.module.scss';

type WeatherInfoProps = {
   temp: number;
   city: string;
   date?: string; // Дата из API
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ temp, city, date }) => {
   // Форматируем дату
   const formatDate = (dateString?: string) => {
      const dateToUse = dateString ? new Date(dateString) : new Date();

      return dateToUse.toLocaleDateString('en-US', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      });
   };

   return (
      <div className={styles.weatherInfo}>
         <div className={styles.cityAndDate}>
            <div className={styles.title}>{city}</div>
            <div className={styles.date}>{formatDate(date)}</div>
         </div>
         <div className={styles.temperature}>
            <img src={sunnySvg} width={120} alt="Sunny" />
            {Math.round(temp)}°
         </div>
      </div>
   );
};
export default WeatherInfo;
