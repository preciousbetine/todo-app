import { useEffect, useState } from 'react';
import DatePickerStyles from '../styles/DatePicker.module.scss';

function DatePicker() {
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<string>(date.toLocaleString('default', { month: 'long' }));
  const [shortMonth, setShortMonth] = useState<string>(date.toLocaleString('default', { month: 'short' }));
  const [year, setYear] = useState<number>(date.getFullYear());
  const [day, setDay] = useState<number>(date.getDate());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(new Date(date.getFullYear(), date.getMonth(), 1).getDay());
  const [daysInMonth, setDaysInMonth] = useState<number>(new Date(date.getFullYear(), date.getMonth(), 0).getDate());
  const [days, setDays] = useState<Array<object>>([]);

  useEffect(() => {
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }));
    setShortMonth(date.toLocaleString('default', { month: 'short' }));
    setYear(date.getFullYear());
    setDay(date.getDate());
    setFirstDayOfMonth(new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1);
    setDaysInMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
    const newDays = [];

    const preecedingZeroes =
      firstDayOfMonth > 1 ? (firstDayOfMonth + 5) - 7 : 0;

    let previousMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    previousMonthDays -= preecedingZeroes - 1;
    let nextMonthDays = 1;

    for (let i = 0; i < 42; i++) {
      if (i < preecedingZeroes) {
        newDays.push({
          day: previousMonthDays,
          previousMonth: true,
        });
        previousMonthDays++;
      } else if (i < daysInMonth + preecedingZeroes)  {
        newDays.push({
          day: i - preecedingZeroes + 1,
          currentMonth: true,
          today: (i - preecedingZeroes + 1 === (new Date()).getDate()) &&
            (date.getMonth() === (new Date()).getMonth() &&
            date.getFullYear() === (new Date()).getFullYear()),
        });
      } else {
        newDays.push({
          day: nextMonthDays,
          nextMonth: true,
        });
        nextMonthDays++;
      }
    }

    setDays(newDays);
  }, [
    date,
    firstDayOfMonth,
    daysInMonth,
    day,
  ]);

  const dateComponents = days.map((day: {
    previousMonth?: boolean,
    currentMonth?: boolean,
    nextMonth?: boolean,
    day?: number,
    today?: boolean,
  }, index: number) => {
    if (day.previousMonth) {
      return (
        <div key={index} className={DatePickerStyles['date-picker__day--previous-month']}>
          <button>{day.day}</button>
        </div>
      );
    } else if (day.nextMonth) {
      return (
        <div key={index} className={DatePickerStyles['date-picker__day--next-month']}>
          <button>{day.day}</button>
        </div>
      );
    } else {
      return (
        <div key={index} className={DatePickerStyles['date-picker__day']}>
          <button className={day.today ? DatePickerStyles.today : ''}>{day.day}</button>
        </div>
      );
    }
  });

  const previousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(1);
    setDate(newDate);
  };

  return (
    <div className={DatePickerStyles['date-picker']}>
      <div className={DatePickerStyles['date-picker__header']}>
        <button onClick={previousMonth}>
          <img src="left.svg" alt="previous month" />
        </button>
        <h3>
          {currentMonth + ' ' + year}
        </h3>
        <button onClick={nextMonth}>
          <img src="right.svg" alt="next month" />
        </button>
      </div>
      <div className={DatePickerStyles['date-picker__select']}>
        <p>{shortMonth + ' ' + day + ', ' + year}</p>
        <button>Today</button>
      </div>
      <div className={DatePickerStyles['date-picker__calendar']}>
        <div className={DatePickerStyles['date-picker__weekdays']}>
          <p>Mo</p>
          <p>Tu</p>
          <p>We</p>
          <p>Th</p>
          <p>Fr</p>
          <p>Sat</p>
          <p>Su</p>
        </div>
        <div className={DatePickerStyles['date-picker__days_row']}>
          {dateComponents}
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
