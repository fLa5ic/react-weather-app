import React from 'react';

import searchSvg from '../../assets/images/icon-search.svg';
import styles from './Search.module.scss';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import {
   removeFromHistory,
   searchCityThunk,
   changeCityThunk,
} from '../../redux/slices/weatherSlice';
import { CITIES } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const searchHistory = useSelector((state: RootState) => state.weather.searchHistory);
   const currentCity = useSelector((state: RootState) => state.weather.currentCity);

   const [searchValue, setSearchValue] = React.useState('');
   const [showCities, setShowCities] = React.useState(false);

   const searchRef = React.useRef<HTMLDivElement>(null);

   React.useEffect(() => {
      try {
         if (searchHistory.length > 0) {
            localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
         } else {
            localStorage.removeItem('weatherSearchHistory');
         }
      } catch (error) {
         console.error('Failed to save search history:', error);
      }
   }, [searchHistory]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (searchValue.trim()) {
         const result = await dispatch(searchCityThunk(searchValue));
         if (searchCityThunk.fulfilled.match(result)) {
            navigate('/');
         } else if (result.payload === 'not-found') {
            navigate('/not-found');
         } else if (result.payload === 'api-error') {
            navigate('/api-error');
         }
         setSearchValue('');
         setShowCities(false);
      }
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setShowCities(true);
   };

   const handleCityClick = async (city: string) => {
      const isStaticCity = CITIES.find((cityObj) => cityObj.name === city);

      if (isStaticCity) {
         const result = await dispatch(
            changeCityThunk({
               cityName: isStaticCity.name,
               lat: isStaticCity.lat,
               lon: isStaticCity.lon,
            }),
         );
         if (changeCityThunk.fulfilled.match(result)) {
            navigate('/');
         }
      } else {
         const result = await dispatch(searchCityThunk(city));
         if (searchCityThunk.fulfilled.match(result)) {
            navigate('/');
         } else if (result.payload === 'not-found') {
            navigate('/not-found');
         } else if (result.payload === 'api-error') {
            navigate('/api-error');
         }
      }
      setShowCities(false);
      setSearchValue('');
   };
   const cities = CITIES;

   // Клик outside
   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const path = event.composedPath && event.composedPath();
         if (searchRef.current && path && !path.includes(searchRef.current)) {
            setShowCities(false);
         }
      };

      document.body.addEventListener('click', handleClickOutside);
      return () => document.body.removeEventListener('click', handleClickOutside);
   }, []);

   return (
      <div ref={searchRef} className={styles.searchWrap}>
         <form onSubmit={handleSubmit} className={styles.search}>
            <img src={searchSvg} alt="Search" />
            <input
               value={searchValue}
               onChange={handleInputChange}
               onFocus={() => setShowCities(true)}
               placeholder="Search for a place..."
            />
            <button type="submit" className={styles.searchBtn}>
               Search
            </button>
            {showCities && (
               <div className={styles.dropDown}>
                  {searchValue === '' ? (
                     // Показываем историю поисков + популярные города
                     <>
                        {searchHistory.map((city) => (
                           <div
                              key={city}
                              className={styles.dropDownItem}
                              onClick={() => handleCityClick(city)}>
                              <span>{city}</span>
                              <button
                                 className={styles.removeBtn}
                                 onClick={(e) => {
                                    e.stopPropagation(); // Чтобы не срабатывал клик на весь элемент
                                    dispatch(removeFromHistory(city));
                                 }}>
                                 ×
                              </button>
                           </div>
                        ))}
                        {cities.map((city) => (
                           <div
                              key={city.name}
                              className={`${styles.dropDownItem} ${
                                 currentCity === city.name ? styles.active : ''
                              }`}
                              onClick={() => handleCityClick(city.name)}>
                              {city.name}
                           </div>
                        ))}
                     </>
                  ) : (
                     // Показываем поисковые предложения
                     <div
                        className={styles.dropDownItem}
                        onClick={() => handleCityClick(searchValue)}>
                        Search for: "{searchValue}"
                     </div>
                  )}
               </div>
            )}
         </form>
      </div>
   );
};

export default Search;
