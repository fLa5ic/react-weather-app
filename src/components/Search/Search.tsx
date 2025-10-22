import React from 'react';
import { useWeather } from '../../context/WeatherContext';

import searchSvg from '../../assets/images/icon-search.svg';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {
    cities, // Добавляем cities в Context
    currentCity,
    searchHistory,
    handleCityChange, // Эти функции должны быть в Context
    searchCity,
    removeFromHistory,
  } = useWeather();
  const [searchValue, setSearchValue] = React.useState('');
  const [showCities, setShowCities] = React.useState(false);

  const searchRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      searchCity(searchValue); // Используем из context
      setSearchValue('');
      setShowCities(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowCities(true);
  };

  const handleCityClick = (city: string) => {
    // cities - это массив объектов {name: string, lat: number, lon: number}
    // city - это строка с названием города

    // Проверяем, есть ли город в статичном списке по имени
    const isStaticCity = cities.some((cityObj) => cityObj.name === city);

    if (isStaticCity) {
      // Если статичный город - используем старую логику
      handleCityChange(city); // Используем из context
    } else {
      // Если город из истории - делаем поиск через геокодинг
      searchCity(city); // Используем из context
    }
    setShowCities(false);
    setSearchValue('');
  };

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
                  <div key={city} className={styles.dropDownItem}>
                    <span onClick={() => handleCityClick(city)}>{city}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={(e) => {
                        e.stopPropagation(); // Чтобы не срабатывал клик на весь элемент
                        removeFromHistory(city); // Используем из context
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
              <div className={styles.dropDownItem} onClick={() => handleCityClick(searchValue)}>
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
