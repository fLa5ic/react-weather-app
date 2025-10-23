import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { DAYS_OF_WEEK_FULL } from '../../constants';

import dropDownIcon from '../../assets/images/icon-dropdown.svg';

import styles from './DaysDropdownBtn.module.scss';

const DaysDropdownBtn: React.FC = () => {
  const { selectedDayIndex, setSelectedDayIndex } = useWeather();
  const [open, setOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const onClickDaysListItem = (i: number) => {
    setSelectedDayIndex(i);
    setOpen(false);
  };

  // Добавить useEffect для закрытия при клике вне
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath && event.composedPath();
      if (dropdownRef.current && path && !path.includes(dropdownRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.daysDropdownBtnWrapper}>
      <button onClick={() => setOpen(!open)} className={styles.daysDropdownBtn}>
        {DAYS_OF_WEEK_FULL[selectedDayIndex]}
        <img src={dropDownIcon} alt="dropDownIcon" />
      </button>
      {open && (
        <div className={styles.daysDropdownPopup}>
          {DAYS_OF_WEEK_FULL.map((name, i) => (
            <button
              key={i}
              onClick={() => onClickDaysListItem(i)}
              className={selectedDayIndex === i ? styles.active : ''}>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default DaysDropdownBtn;
