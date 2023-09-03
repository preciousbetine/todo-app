import { useEffect, useState } from 'react';
import ComponentStyles from '../styles/HorizontalDateSelect.module.scss';

function HorizontalDateSelect() {
  const [currentMonth] = useState<number>(new Date().getMonth());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
  const firstDay = new Date(new Date().getFullYear(), currentMonth, 1).getDay();

  const daysArray = [];
  for (let i = 0; i < daysInMonth; i++) {
    daysArray.push({
      day: i + 1,
      dayOfWeek: days[(i + firstDay) % 7],
    });
  }

  const daysJSX = daysArray.map((day) => (
    <button
      type="button"
      key={day.day}
      className={ComponentStyles.day + (day.day === (new Date).getDate() ? ' ' + ComponentStyles.today : '') }
    >
      <span>{day.dayOfWeek}</span>
      <span>{day.day}</span>
    </button>
  ));

  useEffect(() => {
    const currentDayButton = document.querySelector(`.${ComponentStyles.today}`);
    currentDayButton?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'center'
    });
  }, []);

  return (
    <div className={ComponentStyles.dateSelect}>
      <h2>{months[currentMonth]}</h2>
      <div className={ComponentStyles.days}>
        {daysJSX}
        <div className={ComponentStyles['hide-scroll']}></div>
      </div>
    </div>
  )
}

export default HorizontalDateSelect;
