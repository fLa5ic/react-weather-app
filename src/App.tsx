import React from 'react';
import axios from 'axios';

// import { fetchWeatherApi } from 'openmeteo';

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
   const [selectedDayIndex, setSelectedDayIndex] = React.useState(0); // Добавили состояние дня
   const [currentCity, setCurrentCity] = React.useState('Berlin, Germany'); // Пока статично

   const cities = [
      'Berlin, Germany',
      'Paris, France',
      'London, UK',
      'Madrid, Spain',
      'Rome, Italy',
      'Moscow, Russia',
      'Minsk, Belarus',
   ];

   React.useEffect(() => {
      fetch(
         'https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=Europe%2FMoscow',
      )
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setWeatherData(data);
            console.log(data);
         })
         .catch((error) => {
            console.error('Ошибка:', error);
         });
   }, []);

   return (
      <div className="wrapper">
         <div className="container">
            <Header />
            <h1 className="mainTitleInApp">How's the sky looking today?</h1>
            <Search cities={cities} />
            <div className="content">
               <div className="content-left">
                  <div className="content-left__top">
                     <WeatherInfo
                        temp={weatherData?.current?.temperature_2m || 0}
                        city={currentCity}
                        date={weatherData?.current?.time} // Передаём время из API
                     />

                     <WeatherDetails
                        feelsLike={weatherData?.current.apparent_temperature}
                        humidity={weatherData?.current?.relative_humidity_2m}
                        wind={weatherData?.current?.wind_speed_10m}
                        precipitation={weatherData?.current?.precipitation}
                     />
                  </div>
                  <div className="content-left__bottom">
                     <div className="content-left__bottom-title">Daily forecast</div>
                     <div className="content-left__bottom-dayilyForecast">
                        <DayilyForecast dailyData={weatherData?.daily} />
                     </div>
                  </div>
               </div>
               <div className="content-right">
                  <div className="content-right__header">
                     <div className="content-right__header-title">Hourly forecast</div>
                     <DaysDropdownBtn
                        selectedDay={selectedDayIndex}
                        onDayChange={setSelectedDayIndex}
                     />
                  </div>
                  <div className="content-right__items">
                     <HourlyForecastItem
                        hourlyData={weatherData?.hourly}
                        selectedDay={selectedDayIndex}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
