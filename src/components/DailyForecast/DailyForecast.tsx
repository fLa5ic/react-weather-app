import React from 'react';
// Импортируем все иконки как в WeatherInfo
import sunnySvg from '../../assets/images/icon-sunny.webp';
import partlyCloudySvg from '../../assets/images/icon-partly-cloudy.webp';
import overcastSvg from '../../assets/images/icon-overcast.webp';
import drizzleSvg from '../../assets/images/icon-drizzle.webp';
import rainSvg from '../../assets/images/icon-rain.webp';
import snowSvg from '../../assets/images/icon-snow.webp';
import stormSvg from '../../assets/images/icon-storm.webp';
import fogSvg from '../../assets/images/icon-fog.webp';
import styles from './DailyForecast.module.scss';

type DayilyForecastProps = {
   dailyData?: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
   };
   getWeatherIcon: (code: number) => string;
};

const DayilyForecast: React.FC<DayilyForecastProps> = ({ dailyData, getWeatherIcon }) => {
   if (!dailyData) {
      return <div>Loading daily forecast...</div>;
   }

   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

   // Функция для получения иконки (аналогично WeatherInfo)
   const getWeatherIconSrc = (code: number) => {
      const iconName = getWeatherIcon(code);
      const iconMap: { [key: string]: string } = {
         'icon-sunny.webp': sunnySvg,
         'icon-partly-cloudy.webp': partlyCloudySvg,
         'icon-overcast.webp': overcastSvg,
         'icon-drizzle.webp': drizzleSvg,
         'icon-rain.webp': rainSvg,
         'icon-snow.webp': snowSvg,
         'icon-storm.webp': stormSvg,
         'icon-fog.webp': fogSvg,
      };
      return iconMap[iconName] || sunnySvg;
   };

   return (
      <>
         {dailyData.time.map((dateString, index) => {
            const date = new Date(dateString);
            const dayName = daysOfWeek[date.getDay()];
            const weatherCode = dailyData.weather_code[index];
            const weatherIconSrc = getWeatherIconSrc(weatherCode);

            return (
               <div key={dateString} className={styles.item}>
                  <div className={styles.day}>{dayName}</div>
                  <img src={weatherIconSrc} alt="Weather" />
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
