import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TodoState } from '../redux/slices/todo';
import DatePickerStyles from '../styles/DatePicker.module.scss';

function DatePicker() {
  function getDaysInMonth(year: number, month: number) {
    const nextMonthDate = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(nextMonthDate.getTime() - 1);
    const daysInMonth = lastDayOfMonth.getDate();
    return daysInMonth;
  }

  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<string>(date.toLocaleString('default', { month: 'long' }));
  const [shortMonth, setShortMonth] = useState<string>(date.toLocaleString('default', { month: 'short' }));
  const [year, setYear] = useState<number>(date.getFullYear());
  const [day, setDay] = useState<number>(date.getDate());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(new Date(date.getFullYear(), date.getMonth(), 1).getDay());

  const [daysInMonth, setDaysInMonth] = useState<number>(getDaysInMonth(date.getFullYear(), date.getMonth()));
  const [days, setDays] = useState<Array<object>>([]);
  const todos = useSelector((s:  { todos: TodoState }) => s.todos).todos;

  useEffect(() => {
    const todoDates = todos.map(todo => todo.date);
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }));
    setShortMonth(date.toLocaleString('default', { month: 'short' }));
    setYear(date.getFullYear());
    setDay(date.getDate());
    setFirstDayOfMonth(new Date(date.getFullYear(), date.getMonth(), 1).getDay());
    setDaysInMonth(getDaysInMonth(date.getFullYear(), date.getMonth()));
    const newDays = [];

    const preecedingZeroes =
      firstDayOfMonth >= 1 ? (firstDayOfMonth + 5) - 6 : 6;

    let previousMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    previousMonthDays -= preecedingZeroes - 1;
    let nextMonthDays = 1;

    for (let i: number = 0; i < 43; i++) {
      if (i < preecedingZeroes) {
        newDays.push({
          day: previousMonthDays,
          previousMonth: true,
        });
        previousMonthDays++;
      } else if (i - preecedingZeroes == 0) continue;
      else if (i <= daysInMonth + preecedingZeroes)  {
        let d:(string|typeof date) = new Date(`${year}-${date.getMonth() + 1}-${i - preecedingZeroes}`)
        d.setDate(d.getDate() + 1)
        d = d.toISOString().slice(0, 10)

        newDays.push({
          day: i - preecedingZeroes,
          currentMonth: true,
          hasTodo: todoDates.includes(d),
          date: d,
          today: (i - preecedingZeroes === (new Date()).getDate()) &&
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

    const calendar = document.querySelector(`.${DatePickerStyles['date-picker__days_row']}`);
    const children = calendar?.children;
    if (children) {
      for (let i = 0; i < children.length || 0; i++) {
        const child = children[i];
        child.classList.add(DatePickerStyles['date-picker__animate']);
        setTimeout(() => {
          child.classList.remove(DatePickerStyles['date-picker__animate']);
        }, 500);
      }
    }

    setDays(newDays);
  }, [
    date,
    firstDayOfMonth,
    daysInMonth,
    year,
    day,
    todos.length,
  ]);

  const dateComponents = days.map((day: {
    previousMonth?: boolean,
    currentMonth?: boolean,
    nextMonth?: boolean,
    day?: number,
    today?: boolean,
    hasTodo?: boolean,
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
          <button
            className={
              (day.today && DatePickerStyles.today) + ' ' +
              (day.hasTodo && DatePickerStyles['has-todo'])
            }
          >
            {day.day}
            <img alt="" src="dot-blue.svg" />
          </button>
        </div>
      );
    }
  });

  const previousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    newDate.setDate(1);
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
        <button
          onClick={() => setDate(new Date())}
        >
          Today
        </button>
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
