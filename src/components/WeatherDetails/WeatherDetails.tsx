import React from 'react';

import styles from './WeatherDetails.module.scss';

type WeatherDetailsProps = {
   feelsLike?: number;
   humidity?: number;
   wind?: number;
   precipitation?: number;
};

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
   feelsLike,
   humidity,
   wind,
   precipitation,
}) => {
   // const detailsItems = ['Feels Like', 'Humidity', 'Wind', 'Precipitation'];
   return (
      <div className={styles.weatherDetails}>
         <div className={styles.item}>
            <div className={styles.title}>Feels Like</div>
            <span>{feelsLike ? Math.round(feelsLike) + '°' : '--'}</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Humidity</div>
            <span>{humidity ? Math.round(humidity) + '%' : '--'}</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Wind</div>
            <span>{wind ? Math.round(wind) + ' km/h' : '--'}</span>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Precipitation</div>
            <span>{precipitation ? Math.round(precipitation) + ' mm' : '0 mm'}</span>
         </div>
      </div>
   );
};
export default WeatherDetails;
