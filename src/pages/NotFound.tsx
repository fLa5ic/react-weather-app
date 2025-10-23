import React from 'react';

import Search from '../components/Search/Search';
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock';

const NotFound: React.FC = () => {
  return (
    <>
      <h1 className="mainTitleInApp">How's the sky looking today?</h1>
      <Search />
      <NotFoundBlock />
    </>
  );
};

export default NotFound;
