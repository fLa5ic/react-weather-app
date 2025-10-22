import React from 'react';
import { useWeather } from '../context/WeatherContext';

import Search from '../components/Search/Search';
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock';

const NotFound: React.FC = () => {
  const { searchCity, handleCityChange } = useWeather();

  console.log('NotFound mounted');
  console.log('searchCity function:', searchCity);
  console.log('handleCityChange function:', handleCityChange);
  
  return (
    <>
      <h1 className="mainTitleInApp">How's the sky looking today?</h1>
      <Search />
      <NotFoundBlock />
    </>
  );
};

export default NotFound;
