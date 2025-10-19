import React from 'react';
// Импортируем все иконки
import sunnySvg from '../../assets/images/icon-sunny.webp';
import partlyCloudySvg from '../../assets/images/icon-partly-cloudy.webp';
import overcastSvg from '../../assets/images/icon-overcast.webp';
import drizzleSvg from '../../assets/images/icon-drizzle.webp';
import rainSvg from '../../assets/images/icon-rain.webp';
import snowSvg from '../../assets/images/icon-snow.webp';
import stormSvg from '../../assets/images/icon-storm.webp';
import fogSvg from '../../assets/images/icon-fog.webp';
import styles from './HourlyForecastItem.module.scss';

type HourlyForecastItemProps = {
   hourlyData?: {
      temperature_2m: number[];
      time: string[];
      weather_code: number[];
   };
   selectedDay: number;
   getWeatherIcon: (code: number) => string;
   convertTemp: (temp: number) => number;
};

const HourlyForecastItem: React.FC<HourlyForecastItemProps> = ({
   hourlyData,
   selectedDay,
   getWeatherIcon,
   convertTemp,
}) => {
   if (!hourlyData) {
      return <div>Loading hourly data...</div>;
   }

   // Функция для получения иконки (добавляем её!)
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
            temperature: convertTemp(hourlyData.temperature_2m[globalIndex]),
            weatherCode: hourlyData.weather_code[globalIndex],
         };
      });
   };

   const hoursForDay = getHoursForSelectedDay();

   // Берем только часы с 3 PM до 10 PM (15:00 - 22:00)
   const eveningHours = hoursForDay.filter((_, index) => index >= 15 && index <= 22);

   return (
      <>
         {eveningHours.map((hour, index) => {
            const weatherIconSrc = getWeatherIconSrc(hour.weatherCode);
            return (
               <div key={index} className={styles.hourlyForecastItem}>
                  <div className={styles.time}>
                     <img src={weatherIconSrc} width={40} alt="WeatherImg" />
                     <span>{hour.time}</span>
                  </div>
                  <p className={styles.temperature}>{hour.temperature}°</p>
               </div>
            );
         })}
      </>
   );
};
export default HourlyForecastItem;
