import React from 'react';
import { useWeather } from '../../context/WeatherContext';

import { Link } from 'react-router-dom';

import logoSvg from '../../assets/images/logo.svg';
import unitsSvg from '../../assets/images/icon-units.svg';
import unitsArrowDown from '../../assets/images/icon-dropdown.svg';
import optionSwitcCheckmark from '../../assets/images/icon-checkmark.svg';
import styles from './Header.module.scss';

// type HeaderProps = {
//   units: 'metric' | 'imperial';
//   setUnits: (units: 'metric' | 'imperial') => void;
// };

const Header: React.FC = () => {
  const { units, setUnits } = useWeather();
  const [open, setOpen] = React.useState(false);

  const handleSwitchToImperial = () => {
    setUnits('imperial');
    setOpen(false);
  };

  const handleSwitchToMetric = () => {
    setUnits('metric');
    setOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoSvg} alt="Weather Now" />
          </Link>
        </div>
        <div className={styles.unitsWrap}>
          <button onClick={() => setOpen(!open)} className={styles.units}>
            <img src={unitsSvg} alt="units" />
            <span>Units</span>
            <img src={unitsArrowDown} alt="dropDown" />
          </button>
          {open && (
            <div className={styles.unitsPopup}>
              <button
                className={styles.switchBtn}
                onClick={units === 'metric' ? handleSwitchToImperial : handleSwitchToMetric}>
                Switch to {units === 'metric' ? 'Imperial' : 'Metric'}
              </button>
              <div className={styles.unitsOptionsWrap}>
                <div className={styles.unitsOption}>
                  <div className={styles.title}>Temperature</div>
                  <button
                    className={`${styles.optionBtn} ${units === 'metric' ? styles.active : ''}`}
                    onClick={() => setUnits('metric')}>
                    Celsius (°C)
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                  <button
                    className={`${styles.optionBtn} ${units === 'imperial' ? styles.active : ''}`}
                    onClick={() => setUnits('imperial')}>
                    Fahrenheit (°F)
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                </div>
                <div className={styles.line}></div>
                <div className={styles.unitsOption}>
                  <div className={styles.title}>Wind Speed</div>
                  <button
                    className={`${styles.optionBtn} ${units === 'metric' ? styles.active : ''}`}
                    onClick={() => setUnits('metric')}>
                    km/h
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                  <button
                    className={`${styles.optionBtn} ${units === 'imperial' ? styles.active : ''}`}
                    onClick={() => setUnits('imperial')}>
                    mph
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                </div>
                <div className={styles.line}></div>
                <div className={styles.unitsOption}>
                  <div className={styles.title}>Precipitation</div>
                  <button
                    className={`${styles.optionBtn} ${units === 'metric' ? styles.active : ''}`}
                    onClick={() => setUnits('metric')}>
                    Millimeters (mm)
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                  <button
                    className={`${styles.optionBtn} ${units === 'imperial' ? styles.active : ''}`}
                    onClick={() => setUnits('imperial')}>
                    Inches (in)
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
