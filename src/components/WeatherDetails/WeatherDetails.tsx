import React from 'react';

import styles from './WeatherDetails.module.scss';

type WeatherDetailsProps = {
   feelsLike?: number;
   humidity?: number;
   wind?: number;
   precipitation?: number;
   units: 'metric' | 'imperial';
};

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
   feelsLike,
   humidity,
   wind,
   precipitation,
   units,
}) => {
   // const detailsItems = ['Feels Like', 'Humidity', 'Wind', 'Precipitation'];
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
            <span>
               {wind !== undefined ? `${wind} ${units === 'metric' ? 'km/h' : 'mph'}` : '--'}
            </span>
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
