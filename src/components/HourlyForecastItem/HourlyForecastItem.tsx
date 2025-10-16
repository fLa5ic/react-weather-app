import React from 'react';

import weatherIcon from '../../assets/images/icon-overcast.webp';

import styles from './HourlyForecastItem.module.scss';

type HourlyForecastItemProps = {
   hourlyData?: {
      temperature_2m: number[];
      time: string[];
   };
   selectedDay: number;
};

const HourlyForecastItem: React.FC<HourlyForecastItemProps> = ({ hourlyData, selectedDay }) => {
   if (!hourlyData) {
      return <div>Loading hourly data...</div>;
   }

   // Фильтруем часы для выбранного дня
   const getHoursForSelectedDay = () => {
      const hoursPerDay = 24;
      const startIndex = selectedDay * hoursPerDay;
      const endIndex = startIndex + hoursPerDay;

      return hourlyData.time.slice(startIndex, endIndex).map((time, index) => {
         const globalIndex = startIndex + index;
         return {
            time: new Date(time).toLocaleTimeString('en-US', {
               hour: 'numeric',
               hour12: true,
            }),
            temperature: Math.round(hourlyData.temperature_2m[globalIndex]),
         };
      });
   };

   const hoursForDay = getHoursForSelectedDay();

   // Берем только часы с 3 PM до 10 PM (15:00 - 22:00)
   const eveningHours = hoursForDay.filter((_, index) => index >= 15 && index <= 22);

   return (
      <>
         {eveningHours.map((hour, index) => (
            <div key={index} className={styles.hourlyForecastItem}>
               <div className={styles.time}>
                  <img src={weatherIcon} width={40} alt="WeatherImg" />
                  <span>{hour.time}</span>
               </div>
               <p className={styles.temperature}>{hour.temperature}°</p>
            </div>
         ))}
      </>
   );
};
export default HourlyForecastItem;
