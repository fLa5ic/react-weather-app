import React from 'react';

import styles from './WeatherDetails.module.scss';

const WeatherDetails: React.FC = () => {
   return (
      <div className={styles.weatherDetails}>
         <div className={styles.item}>
            <div className={styles.title}>Feels Like</div>
            <span>18°</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Feels Like</div>
            <span>18°</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Feels Like</div>
            <span>18°</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Feels Like</div>
            <span>18°</span>
         </div>
      </div>
   );
};
export default WeatherDetails;
