import React from 'react';

import styles from './WeatherDetails.module.scss';

const WeatherDetails: React.FC = () => {
   // const detailsItems = ['Feels Like', 'Humidity', 'Wind', 'Precipitation'];
   return (
      <div className={styles.weatherDetails}>
         <div className={styles.item}>
            <div className={styles.title}>Feels Like</div>
            <span>18°</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Humidity</div>
            <span>46%</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Wind</div>
            <span>14 km/h</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Precipitation</div>
            <span>0 mm</span>
         </div>
      </div>
   );
};
export default WeatherDetails;
