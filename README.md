# ⛅ React Weather App

A modern, responsive weather application built with React, TypeScript, and SCSS. This app provides real-time weather information and forecasts for cities worldwide.

## 🌟 Features

-  **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and precipitation
-  **7-Day Forecast**: View daily weather forecasts with min/max temperatures
-  **Hourly Forecast**: Check hourly weather predictions for the selected day
-  **City Search**: Search for any city worldwide using OpenStreetMap geocoding
-  **Search History**: Quick access to previously searched cities (stored in localStorage)
-  **Popular Cities**: Quick selection from pre-configured popular cities
-  **Unit Conversion**: Toggle between Metric (°C, km/h, mm) and Imperial (°F, mph, in) units
-  **Responsive Design**: Fully adaptive layout for Mobile (375px), Tablet (768px), and Desktop (1200px+)
-  **Type-Safe**: Built with TypeScript for enhanced code quality and developer experience

## 🛠️ Technologies Used

-  **React 19** - UI library
-  **TypeScript** - Type safety and better developer experience
-  **Redux Toolkit** - State management with async thunks
-  **React Redux** - React bindings for Redux
-  **React Router v6** - Client-side routing
-  **Axios** - HTTP requests
-  **SCSS Modules** - Scoped styling
-  **Open-Meteo API** - Weather data
-  **OpenStreetMap Nominatim API** - Geocoding service

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/fLa5ic/react-weather-app.git
cd react-weather-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Available Scripts

-  `npm start` - Runs the app in development mode
-  `npm run build` - Builds the app for production
-  `npm test` - Launches the test runner
-  `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── assets/           # Images, fonts, and static files
├── components/       # Reusable React components
│   ├── ApiErrorBlock/
│   ├── DailyForecast/
│   ├── DaysDropdownBtn/
│   ├── Header/
│   ├── HourlyForecastItem/
│   ├── NotFoundBlock/
│   ├── Search/
│   ├── WeatherDetails/
│   └── WeatherInfo/
├── constants/        # App constants and configuration
├── redux/            # Redux Toolkit state management
│   ├── slices/       # Redux slices with reducers and async thunks
│   └── store.ts      # Redux store configuration
├── pages/            # Page components
│   ├── ApiError.tsx
│   ├── Home.tsx
│   └── NotFound.tsx
├── scss/             # Global styles and SCSS utilities
├── types/            # TypeScript type definitions
├── utils/            # Utility functions (converters, helpers)
├── App.tsx           # Main App component
└── index.tsx         # Entry point
```

## 🎨 Key Features Explained

### Redux Toolkit State Management

The app uses Redux Toolkit for centralized state management with the following features:

-  **Centralized Store**: All weather data, units, search history, and UI states in one place
-  **Async Thunks**: API calls handled with `createAsyncThunk` for weather fetching and city search
-  **Type-Safe**: Fully typed Redux slices with TypeScript for enhanced developer experience
-  **Pure Utility Functions**: Conversion functions (temperature, speed, precipitation) as reusable pure functions

### Type Safety

All API responses, Redux state, and data structures are properly typed with TypeScript interfaces, ensuring type safety and better developer experience.

### Modular Components

Components use `useSelector` and `useDispatch` hooks to connect to Redux store. Organized with SCSS modules for scoped styling, making the codebase maintainable and scalable.

### Error Handling

Dedicated error pages for API failures and search results not found, with navigation back to the main page. Async thunks handle loading and error states automatically.

### Responsive Design

The application is fully responsive and optimized for different screen sizes:

-  **📱 Mobile (375px)**: Compact single-column layout with stacked components, 3x3 grid for daily forecast
-  **📱 Tablet (376px - 768px)**: Optimized two-column layout with expanded weather cards, 7x1 grid for daily forecast
-  **🖥️ Desktop (769px+)**: Full-width layout with side-by-side weather information and forecast panels

All breakpoints use CSS media queries with non-overlapping ranges to ensure consistent rendering across devices.

## 🌐 APIs Used

-  **Open-Meteo API**: Free weather API providing current conditions, hourly and daily forecasts

   -  No API key required
   -  Rate limit: Reasonable free tier

-  **OpenStreetMap Nominatim API**: Geocoding service to convert city names to coordinates
   -  No API key required
   -  Please respect usage policy

## 💡 Future Improvements

-  Loading skeletons for better UX during data fetching
-  Weather alerts and notifications
-  Geolocation support
-  More detailed weather information
-  Charts for temperature/precipitation trends
-  Dark mode support

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a portfolio project to demonstrate modern React development practices.

---

**Note**: This project uses free weather APIs. Please be respectful of rate limits and usage policies.
