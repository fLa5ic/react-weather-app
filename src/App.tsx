import { WeatherProvider } from './context/WeatherContext';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home';
import ApiError from './pages/ApiError';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {
  return (
    <WeatherProvider>
      <div className="wrapper">
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/api-error" element={<ApiError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
