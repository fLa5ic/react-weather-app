import React from 'react';
import searchSvg from '../../assets/images/icon-search.svg';
import styles from './Search.module.scss';

type SearchProps = {
   cities: string[];
};

const Search: React.FC<SearchProps> = ({ cities }) => {
   const [searchDropDown, setSearchDropDown] = React.useState(false);

   const inputRef = React.useRef<HTMLInputElement>(null);
   const searchRef = React.useRef<HTMLDivElement>(null);

   const onFocusInput = () => {
      setSearchDropDown(true);
   };

   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         // Спросим: есть ли новый ключ? Если да - используем его
         const path = event.composedPath && event.composedPath();

         // Если дверь существует И ключ существует И кликнули НЕ на дверь
         if (searchRef.current && path && !path.includes(searchRef.current)) {
            setSearchDropDown(false); // Закрываем окошко!
         }
      };

      // Слушаем все клики на странице
      document.body.addEventListener('click', handleClickOutside);

      // Убираем слушателя, когда компонент исчезает
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
                     <div key={city} className={styles.dropDownItem}>
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
