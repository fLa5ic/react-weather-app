import React from 'react';

import Header from './components/Header/Header';
import Search from './components/Search/Search';

import './scss/app.scss';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <h1 className="mainTitleInApp">How’s the sky looking today?</h1>
        <Search />
      </div>
    </div>
  );
}

export default App;
