import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home';
import ApiError from './pages/ApiError';
import NotFound from './pages/NotFound';

import './scss/app.scss';

type Units = 'metric' | 'imperial';

function App() {
  const [units, setUnits] = React.useState<Units>('metric');
  return (
    <div className="wrapper">
      <div className="container">
        <Header units={units} setUnits={setUnits} />
        <Routes>
          <Route path="/" element={<Home units={units} setUnits={setUnits} />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="/ApiError" element={<ApiError />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
