import React from 'react';
import axios from 'axios';

import { fetchWeatherApi } from 'openmeteo';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import DayilyForecast from './components/DailyForecast/DailyForecast';
import DaysDropdownBtn from './components/DaysDropdownBtn/DaysDropdownBtn';
import HourlyForecastItem from './components/HourlyForecastItem/HourlyForecastItem';

import './scss/app.scss';

function App() {
   const [weatherData, setWeatherData] = React.useState<any>(null);

   const getDataCity = async () => {
      const params = {
         latitude: [52.5244],
         longitude: [13.4105],
         daily: ['temperature_2m_max', 'temperature_2m_min'],
         hourly: 'temperature_2m',
         current: ['temperature_2m', 'wind_speed_10m', 'relative_humidity_2m', 'precipitation'],
         timezone: 'Europe/Moscow',
         forecast_hours: 24,
      };
      const url = 'https://api.open-meteo.com/v1/forecast';
      const responses = await fetchWeatherApi(url, params);

      const response = responses[0];
      const current = response.current();
      const hourly = response.hourly();
      const daily = response.daily();

      // Сохраняем данные в состоянии
      setWeatherData({
         current,
         hourly,
         daily,
      });

      console.log('=== ПОЛНЫЙ ОБЪЕКТ current ===');
      console.log(current);
   };

   return (
      <div className="wrapper">
         <div className="container">
            <Header />
            <h1 className="mainTitleInApp">How's the sky looking today?</h1>
            <Search getDataCity={getDataCity} />
            <div className="content">
               <div className="content-left">
                  <div className="content-left__top">
                     <WeatherInfo
                        temp={
                           weatherData?.current?.variables().get('temperature_2m')?.value() || '--'
                        }
                     />
                     <WeatherDetails />
                  </div>
                  <div className="content-left__bottom">
                     <div className="content-left__bottom-title">Daily forecast</div>
                     <div className="content-left__bottom-dayilyForecast">
                        <DayilyForecast />
                     </div>
                  </div>
               </div>
               <div className="content-right">
                  <div className="content-right__header">
                     <div className="content-right__header-title">Hourly forecast</div>
                     <DaysDropdownBtn />
                  </div>
                  <div className="content-right__items">
                     <HourlyForecastItem />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
