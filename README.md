# ⛅ React Weather App

A modern, responsive weather application built with React, TypeScript, and SCSS. This app provides real-time weather information and forecasts for cities worldwide.

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and precipitation
- **7-Day Forecast**: View daily weather forecasts with min/max temperatures
- **Hourly Forecast**: Check hourly weather predictions for the selected day
- **City Search**: Search for any city worldwide using OpenStreetMap geocoding
- **Search History**: Quick access to previously searched cities (stored in localStorage)
- **Popular Cities**: Quick selection from pre-configured popular cities
- **Unit Conversion**: Toggle between Metric (°C, km/h, mm) and Imperial (°F, mph, in) units
- **Responsive Design**: Clean, modern UI with smooth interactions
- **Type-Safe**: Built with TypeScript for enhanced code quality and developer experience

## 🛠️ Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **React Router v6** - Client-side routing
- **Axios** - HTTP requests
- **SCSS Modules** - Scoped styling
- **Open-Meteo API** - Weather data
- **OpenStreetMap Nominatim API** - Geocoding service

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-weather-app.git
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

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

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
├── context/          # React Context for state management
├── pages/            # Page components
│   ├── ApiError.tsx
│   ├── Home.tsx
│   └── NotFound.tsx
├── scss/             # Global styles and SCSS utilities
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main App component
└── index.tsx         # Entry point
```

## 🎨 Key Features Explained

### Weather Context

The app uses React Context API for global state management, making weather data, units, and settings accessible throughout the component tree.

### Type Safety

All API responses and data structures are properly typed with TypeScript interfaces, ensuring type safety and better developer experience.

### Modular Components

Components are organized with SCSS modules for scoped styling, making the codebase maintainable and scalable.

### Error Handling

Dedicated error pages for API failures and search results not found, with navigation back to the main page.

## 🌐 APIs Used

- **Open-Meteo API**: Free weather API providing current conditions, hourly and daily forecasts

  - No API key required
  - Rate limit: Reasonable free tier

- **OpenStreetMap Nominatim API**: Geocoding service to convert city names to coordinates
  - No API key required
  - Please respect usage policy

## 💡 Future Improvements

- Loading skeletons for better UX during data fetching
- Responsive design for mobile devices
- Weather alerts and notifications
- Geolocation support
- More detailed weather information
- Charts for temperature/precipitation trends
- Dark mode support

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a portfolio project to demonstrate modern React development practices.

---

**Note**: This project uses free weather APIs. Please be respectful of rate limits and usage policies.
