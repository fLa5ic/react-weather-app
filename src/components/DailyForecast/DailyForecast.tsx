import React from 'react';
import weatherIcon from '../../assets/images/icon-drizzle.webp';
import styles from './DailyForecast.module.scss';

type DayilyForecastProps = {
   dailyData?: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
   };
};

const DayilyForecast: React.FC<DayilyForecastProps> = ({ dailyData }) => {
   // Если данных нет, показываем заглушку
   if (!dailyData) {
      return <div>Loading daily forecast...</div>;
   }

   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

   return (
      <>
         {dailyData.time.map((dateString, index) => {
            // Преобразуем строку даты в объект Date
            const date = new Date(dateString);
            // Получаем день недели (0 - Sunday, 1 - Monday, etc.)
            const dayName = daysOfWeek[date.getDay()];

            return (
               <div key={dateString} className={styles.item}>
                  <div className={styles.day}>{dayName}</div>
                  <img src={weatherIcon} alt="Weather" />
                  <div className={styles.temperature}>
                     <span className={styles.maxTemp}>
                        {Math.round(dailyData.temperature_2m_max[index])}°
                     </span>
                     <span className={styles.minTemp}>
                        {Math.round(dailyData.temperature_2m_min[index])}°
                     </span>
                  </div>
               </div>
            );
         })}
      </>
   );
};
export default DayilyForecast;
