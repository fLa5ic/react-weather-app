import React from 'react';
import Search from '../components/Search/Search';
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock';

type NotFoundProps = {
   units: 'metric' | 'imperial';
   setUnits: (units: 'metric' | 'imperial') => void;
   // Добавь остальные пропсы которые нужны для Search
   cities?: string[];
   onCityChange?: (city: string) => void;
   currentCity?: string;
   onSearch?: (query: string) => void;
   searchHistory?: string[];
   onRemoveFromHistory?: (city: string) => void;
};

const NotFound: React.FC<NotFoundProps> = ({
   units,
   setUnits,
   cities = [],
   onCityChange = () => {},
   currentCity = '',
   onSearch = () => {},
   searchHistory = [],
   onRemoveFromHistory = () => {},
}) => {
   return (
      <>
         <h1 className="mainTitleInApp">How's the sky looking today?</h1>
         <Search
            cities={cities}
            onCityChange={onCityChange}
            currentCity={currentCity}
            onSearch={onSearch}
            searchHistory={searchHistory}
            onRemoveFromHistory={onRemoveFromHistory}
         />
         <NotFoundBlock />
      </>
   );
};

export default NotFound;
