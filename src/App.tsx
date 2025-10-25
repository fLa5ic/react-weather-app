import React from 'react';
import { useAppDispatch } from './redux/store';
import { fetchWeatherThunk, setSearchHistory } from './redux/slices/weatherSlice';
import { DEFAULT_CITY_LAT, DEFAULT_CITY_LON } from './constants';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home';
import ApiError from './pages/ApiError';
import NotFound from './pages/NotFound';

import './scss/app.scss';

// npm install @reduxjs/toolkit react-redux

function App() {
   const dispatch = useAppDispatch();

   React.useEffect(() => {
      // Загружаем историю из localStorage
      try {
         const savedHistory = localStorage.getItem('weatherSearchHistory');
         if (savedHistory) {
            dispatch(setSearchHistory(JSON.parse(savedHistory)));
         }
      } catch (error) {
         console.error('Failed to load search history:', error);
         localStorage.removeItem('weatherSearchHistory');
      }

      // Загружаем погоду для дефолтного города
      dispatch(
         fetchWeatherThunk({
            lat: DEFAULT_CITY_LAT,
            lon: DEFAULT_CITY_LON,
         }),
      );
   }, [dispatch]);
   return (
      <div className="wrapper">
         <div className="container">
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/not-found" element={<NotFound />} />
               <Route path="/api-error" element={<ApiError />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;
