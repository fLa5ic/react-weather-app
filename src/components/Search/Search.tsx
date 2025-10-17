import React from 'react';
import searchSvg from '../../assets/images/icon-search.svg';
import styles from './Search.module.scss';

type SearchProps = {
   cities: string[];
   onCityChange: (city: string) => void;
   currentCity: string;
};

const Search: React.FC<SearchProps> = ({ cities, onCityChange, currentCity }) => {
   const [searchDropDown, setSearchDropDown] = React.useState(false);

   const inputRef = React.useRef<HTMLInputElement>(null);
   const searchRef = React.useRef<HTMLDivElement>(null);

   const onFocusInput = () => {
      setSearchDropDown(true);
   };

   const handleCityClick = (city: string) => {
      onCityChange(city); // Передаём выбранный город в App
      setSearchDropDown(false);
      if (inputRef.current) {
         inputRef.current.value = ''; // Очищаем input
      }
   };

   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const path = event.composedPath && event.composedPath();
         if (searchRef.current && path && !path.includes(searchRef.current)) {
            setSearchDropDown(false);
         }
      };

      document.body.addEventListener('click', handleClickOutside);
      return () => {
         document.body.removeEventListener('click', handleClickOutside);
      };
   }, []);

   return (
      <div ref={searchRef} className={styles.searchWrap}>
         <div className={styles.search}>
            <img src={searchSvg} alt="Search" />
            <input onFocus={onFocusInput} ref={inputRef} placeholder="Search for a place..." />
            <button className={styles.searchBtn}>Search</button>
            {searchDropDown && (
               <div className={styles.dropDown}>
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
               </div>
            )}
         </div>
      </div>
   );
};

export default Search;
