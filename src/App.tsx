import React from 'react';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import DayilyForecast from './components/DailyForecast/DailyForecast';

import rainImg from './assets/images/icon-rain.webp';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <h1 className="mainTitleInApp">How's the sky looking today?</h1>
        <Search />
        <div className="content">
          <div className="content-left">
            <div className="content-left__top">
              <WeatherInfo />
              <WeatherDetails />
            </div>
            <div className="content-left__bottom">
              <div className="content-left__bottom-title">Daily forecast</div>
              <div className="content-left__bottom-dayilyForecast">
                <DayilyForecast day="Tue" image={rainImg} maxTemp="20°" minTemp="14°" />
                <DayilyForecast day="Tue" image={rainImg} maxTemp="20°" minTemp="14°" />
                <DayilyForecast day="Tue" image={rainImg} maxTemp="20°" minTemp="14°" />
                <DayilyForecast day="Tue" image={rainImg} maxTemp="20°" minTemp="14°" />
                <DayilyForecast day="Tue" image={rainImg} maxTemp="20°" minTemp="14°" />
                <DayilyForecast day="Tue" image={rainImg} maxTemp="20°" minTemp="14°" />
                <DayilyForecast day="Tue" image={rainImg} maxTemp="20°" minTemp="14°" />
              </div>
            </div>
          </div>
          <div className="content-right"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
