import React from 'react';

import sunnySvg from '../../assets/images/icon-sunny.webp';

import styles from './WeatherInfo.module.scss';

type WeatherInfoProps = {
   temp: string | number;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ temp }) => {
   return (
      <div className={styles.weatherInfo}>
         <div className={styles.cityAndDate}>
            <div className={styles.title}>Berlin, Germany</div>
            <div className={styles.date}>Tuesday, Aug 5, 2025</div>
         </div>
         <div className={styles.temperature}>
            <img src={sunnySvg} width={120} alt="Sunny" />
            {/* 20° */}
            {temp}°
         </div>
      </div>
   );
};
export default WeatherInfo;
