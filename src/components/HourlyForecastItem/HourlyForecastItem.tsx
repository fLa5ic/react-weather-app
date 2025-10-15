import React from 'react';

import weatherIcon from '../../assets/images/icon-overcast.webp';

import styles from './HourlyForecastItem.module.scss';

type HourlyForecastItemProps = {
   hourlyData?: {
      temperature_2m: number[];
      time: string[];
   };
};

const HourlyForecastItem: React.FC<HourlyForecastItemProps> = ({ hourlyData }) => {
   const hourlyForecastTime = ['3 PM', '4 PM', '5 PM', ' 6 PM', '7 PM', '8 PM', '9 PM', '10 PM'];

   return (
      <>
         {hourlyForecastTime.map((time: string) => (
            <div key={time} className={styles.hourlyForecastItem}>
               <div className={styles.time}>
                  <img src={weatherIcon} width={40} alt="WeatherImg" />
                  <span>{time}</span>
               </div>
               <p className={styles.temperature}>20°</p>
            </div>
         ))}
      </>
   );
};
export default HourlyForecastItem;
