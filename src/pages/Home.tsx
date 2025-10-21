import React from 'react';

import axios from 'axios';

import Search from '../components/Search/Search';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import DayilyForecast from '../components/DailyForecast/DailyForecast';
import DaysDropdownBtn from '../components/DaysDropdownBtn/DaysDropdownBtn';
import HourlyForecastItem from '../components/HourlyForecastItem/HourlyForecastItem';

import NotFound from './NotFound';
import ApiError from './ApiError';

type HomeProps = {
  units: 'metric' | 'imperial';
  setUnits: (units: 'metric' | 'imperial') => void;
};

function Home({ units, setUnits }: HomeProps) {
  const [weatherData, setWeatherData] = React.useState<any>(null);
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(0);
  const [currentCity, setCurrentCity] = React.useState('Minsk, Belarus');

  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);

  const [loading, setLoading] = React.useState(false);

  const convertTemp = (temp: number): number => {
    if (units === 'imperial') {
      return Math.round((temp * 9) / 5 + 32); // в Фаренгейты
    }
    return Math.round(temp); // в Цельсии
  };

  const convertSpeed = (speed: number): number => {
    if (units === 'imperial') {
      return Math.round(speed * 0.621371); // в mph
    }
    return Math.round(speed); // в km/h
  };

  const convertPrecipitation = (precip: number): number => {
    if (units === 'imperial') {
      return Math.round(precip * 0.0393701 * 100) / 100; // в дюймы
    }
    return precip; // в мм
  };

  const cities = [
    { name: 'Minsk, Belarus', lat: 53.9045, lon: 27.5615 },
    { name: 'Berlin, Germany', lat: 52.5244, lon: 13.4105 },
    { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
    { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
    { name: 'Madrid, Spain', lat: 40.4168, lon: -3.7038 },
    { name: 'Rome, Italy', lat: 41.9028, lon: 12.4964 },
    { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6173 },
  ];

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=weather_code,temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`,
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения иконки по коду погоды
  const getWeatherIcon = (weatherCode: number): string => {
    const iconMap: { [key: number]: string } = {
      // Clear
      0: 'icon-sunny.webp',
      // Mainly clear, partly cloudy
      1: 'icon-partly-cloudy.webp',
      2: 'icon-partly-cloudy.webp',
      // Cloudy
      3: 'icon-overcast.webp',
      // Fog
      45: 'icon-fog.webp',
      48: 'icon-fog.webp',
      // Drizzle
      51: 'icon-drizzle.webp',
      53: 'icon-drizzle.webp',
      55: 'icon-drizzle.webp',
      // Rain
      61: 'icon-rain.webp',
      63: 'icon-rain.webp',
      65: 'icon-rain.webp',
      // Snow
      71: 'icon-snow.webp',
      73: 'icon-snow.webp',
      75: 'icon-snow.webp',
      // Storm
      95: 'icon-storm.webp',
      96: 'icon-storm.webp',
      99: 'icon-storm.webp',
    };

    return iconMap[weatherCode] || 'icon-sunny.webp'; // default
  };

  // Функция смены города
  const handleCityChange = (cityName: string) => {
    const selectedCity = cities.find((city) => city.name === cityName);
    if (selectedCity) {
      setCurrentCity(cityName);
      fetchWeather(selectedCity.lat, selectedCity.lon);
    }
  };

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    // Загружаем погоду для Минска при первом рендере
    fetchWeather(53.9045, 27.5615);
  }, []);

  const searchCity = async (cityName: string) => {
    setLoading(true);
    try {
      console.log('Ищем город:', cityName);

      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          cityName,
        )}&limit=1&accept-language=en`,
      );

      console.log('Результат геокодинга:', geoResponse.data);

      if (geoResponse.data.length > 0) {
        const { lat, lon, display_name } = geoResponse.data[0];

        const cityNameEn = display_name.split(',')[0];
        setCurrentCity(cityNameEn);
        fetchWeather(parseFloat(lat), parseFloat(lon));

        // Сохраняем в историю - ВОТ ЭТОТ ИСПРАВЛЕННЫЙ КОД
        setSearchHistory((prev) => {
          const newHistory = [cityName, ...prev.filter((item) => item !== cityName)].slice(0, 10);
          localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
          return newHistory;
        });
      } else {
        alert('City not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error searching city');
    } finally {
      setLoading(false);
    }
  };

  const removeFromHistory = (cityToRemove: string) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter((city) => city !== cityToRemove);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };
  return (
    <>
      <h1 className="mainTitleInApp">How's the sky looking today?</h1>
      <Search
        cities={cities.map((city) => city.name)}
        onCityChange={handleCityChange}
        currentCity={currentCity}
        onSearch={searchCity}
        searchHistory={searchHistory}
        onRemoveFromHistory={removeFromHistory}
      />
      {/* {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div>} */}
      <div className="content">
        <div className="content-left">
          <div className="content-left__top">
            <WeatherInfo
              temp={convertTemp(weatherData?.current?.temperature_2m || 0)}
              city={currentCity}
              date={weatherData?.current?.time}
              weatherCode={weatherData?.current?.weather_code}
              getWeatherIcon={getWeatherIcon} // Передаём функцию
            />
            <WeatherDetails
              feelsLike={convertTemp(weatherData?.current?.apparent_temperature)}
              humidity={weatherData?.current?.relative_humidity_2m}
              wind={convertSpeed(weatherData?.current?.wind_speed_10m)}
              precipitation={convertPrecipitation(weatherData?.current?.precipitation)}
              units={units}
            />
          </div>
          <div className="content-left__bottom">
            <div className="content-left__bottom-title">Daily forecast</div>
            <div className="content-left__bottom-dayilyForecast">
              <DayilyForecast
                dailyData={weatherData?.daily}
                getWeatherIcon={getWeatherIcon}
                convertTemp={convertTemp}
              />
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="content-right__header">
            <div className="content-right__header-title">Hourly forecast</div>
            <DaysDropdownBtn selectedDay={selectedDayIndex} onDayChange={setSelectedDayIndex} />
          </div>
          <div className="content-right__items">
            <HourlyForecastItem
              hourlyData={weatherData?.hourly}
              selectedDay={selectedDayIndex}
              getWeatherIcon={getWeatherIcon}
              convertTemp={convertTemp}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
