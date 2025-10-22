import React from 'react';
import { useWeather } from '../../context/WeatherContext';

import dropDownIcon from '../../assets/images/icon-dropdown.svg';

import styles from './DaysDropdownBtn.module.scss';

type DaysDropdownBtnProps = {
  selectedDay: number;
  onDayChange: (dayIndex: number) => void;
};

const DaysDropdownBtn: React.FC = () => {
  const { selectedDayIndex, setSelectedDayIndex } = useWeather();
  const [open, setOpen] = React.useState(false);
  // const [selectedDay, setSelectedDay] = React.useState(0);

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const onClickDaysListItem = (i: number) => {
    setSelectedDayIndex(i); // Передаём наружу выбранный день
    setOpen(false);
  };

  return (
    <div className={styles.daysDropdownBtnWrapper}>
      <button onClick={() => setOpen(!open)} className={styles.daysDropdownBtn}>
        {daysList[selectedDayIndex]}
        <img src={dropDownIcon} alt="dropDownIcon" />
      </button>
      {open && (
        <div className={styles.daysDropdownPopup}>
          {daysList.map((name, i) => (
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
