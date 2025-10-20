import React from 'react';
import searchSvg from '../../assets/images/icon-search.svg';
import styles from './Search.module.scss';

type SearchProps = {
  cities: string[];
  onCityChange: (city: string) => void;
  currentCity: string;
  onSearch: (query: string) => void;
  searchHistory: string[];
  onRemoveFromHistory: (city: string) => void;
};

const Search: React.FC<SearchProps> = ({
  cities,
  onCityChange,
  currentCity,
  onSearch,
  searchHistory,
  onRemoveFromHistory,
}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [showCities, setShowCities] = React.useState(false);

  const searchRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
      setSearchValue('');
      setShowCities(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowCities(true);
  };

  const handleCityClick = (city: string) => {
    onCityChange(city);
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
                        onRemoveFromHistory(city);
                      }}>
                      ×
                    </button>
                  </div>
                ))}
                {cities.map((city) => (
                  <div
                    key={city}
                    className={`${styles.dropDownItem} ${
                      currentCity === city ? styles.active : ''
                    }`}
                    onClick={() => handleCityClick(city)}>
                    {city}
                  </div>
                ))}
              </>
            ) : (
              // Показываем поисковые предложения
              <div className={styles.dropDownItem} onClick={() => handleCityClick(searchValue)}>Search for: "{searchValue}"</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
