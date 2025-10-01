import React from 'react';

import logoSvg from '../../assets/images/logo.svg';
import unitsSvg from '../../assets/images/icon-units.svg';
import unitsArrowDown from '../../assets/images/icon-dropdown.svg';
import optionSwitcCheckmark from '../../assets/images/icon-checkmark.svg';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.logo}>
            <img src={logoSvg} alt="Weather Now" />
          </div>
          <div className={styles.unitsWrap}>
            <button className={styles.units}>
              <img src={unitsSvg} alt="units" />
              <span>Units</span>
              <img src={unitsArrowDown} alt="dropDown" />
            </button>
            <div className={styles.unitsPopup}>
              <button className={styles.switchBtn}>Switch to Imperial</button>
              <div className={styles.unitsOptionsWrap}>
                <div className={styles.unitsOption}>
                  <div className={styles.title}>Temperature</div>
                  <button className={styles.optionBtn}>
                    Celsius (°C)
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                  <button className={styles.optionBtn}>
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
                  <button className={styles.optionBtn}>
                    km/h
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                  <button className={styles.optionBtn}>
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
                  <button className={styles.optionBtn}>
                    Millimeters (mm)
                    <img
                      className={styles.checkmarkIcon}
                      src={optionSwitcCheckmark}
                      alt="checkmark"
                    />
                  </button>
                  <button className={styles.optionBtn}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
