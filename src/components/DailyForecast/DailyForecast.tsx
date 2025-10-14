import React from 'react';

import weatherIcon from '../../assets/images/icon-drizzle.webp';

import styles from './DailyForecast.module.scss';

const DayilyForecast: React.FC = () => {
   const days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
   return (
      <>
         {days.map((day: string) => (
            <div key={day} className={styles.item}>
               <div className={styles.day}>{day}</div>
               <img src={weatherIcon} alt="Drizzle" />
               <div className={styles.temperature}>
                  <span className={styles.maxTemp}>20°</span>
                  <span className={styles.minTemp}>12°</span>
               </div>
            </div>
         ))}
      </>
   );
};
export default DayilyForecast;
