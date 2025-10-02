import React from 'react';

import searchSvg from '../../assets/images/icon-search.svg';

import styles from './Search.module.scss';

const Search: React.FC = () => {
   return (
      <div className={styles.searchWrap}>
         <div className={styles.search}>
            <img src={searchSvg} alt="Search" />
            <input placeholder="Search for a place..." />
            <button className={styles.searchBtn}>Search</button>
            <div className={styles.dropDown}>
               <div className={styles.dropDownItem}>City Name</div>
               <div className={styles.dropDownItem}>City Name</div>
               <div className={styles.dropDownItem}>City Name</div>
               <div className={styles.dropDownItem}>City Name</div>
            </div>
         </div>
      </div>
   );
};
export default Search;
