import Search from '../components/Search/Search';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import DayilyForecast from '../components/DailyForecast/DailyForecast';
import DaysDropdownBtn from '../components/DaysDropdownBtn/DaysDropdownBtn';
import HourlyForecastItem from '../components/HourlyForecastItem/HourlyForecastItem';

function Home() {
  return (
    <>
      <h1 className="mainTitleInApp">How's the sky looking today?</h1>
      <Search />
      {/* {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div>} */}
      <div className="content">
        <div className="content-left">
          <div className="content-left__top">
            <WeatherInfo />
            <WeatherDetails />
          </div>
          <div className="content-left__bottom">
            <div className="content-left__bottom-title">Daily forecast</div>
            <div className="content-left__bottom-dayilyForecast">
              <DayilyForecast />
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="content-right__header">
            <div className="content-right__header-title">Hourly forecast</div>
            <DaysDropdownBtn />
          </div>
          <div className="content-right__items">
            <HourlyForecastItem />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
