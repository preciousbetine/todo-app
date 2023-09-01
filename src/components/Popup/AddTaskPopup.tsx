import { useState } from 'react';
import { v5 as uuidv5 } from 'uuid';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addTodo } from '../../redux/slices/todo';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';
import TaskStyles from '../../styles/TaskPopup.module.scss';

export default function AddTaskPopup({ id, visible, setVisible }: TaskPopupProps) {
  const [title, setTitle] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('02:00');
  const [endTime, setEndTime] = useState<string>('04:00');
  const [date, setDate] = useState<string>('Today');

  const dispatch = useDispatch<AppDispatch>();

  const saveTodo = () => {
    const id = uuidv5((Math.random() * 200).toString(), uuidv5.URL);

    const todo = {
      id,
      title,
      startTime,
      endTime,
      date,
      completed: false,
    };

    dispatch(addTodo(todo));

    setTitle('');
    setStartTime(startTime);
    setEndTime(endTime);
    setDate(date);
    setVisible(false);
  };

  return (
    <TaskPopupWrapper id={id} visible={visible} setVisible={setVisible}>
      <div className={TaskStyles['task-popup_content']}>
        <div className={TaskStyles['task-popup_header']}>
          <h3>Add Task</h3>
          <button
            type="button"
            onClick={() => setVisible(false)}>
            <img alt="close" src="close.svg" />
          </button>
        </div>
        <textarea
          className={TaskStyles['task-popup_description']}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={TaskStyles['task-time_settings']}>
          <button className={TaskStyles['task-time_settings_day']}>
            <img
              alt="date"
              src="calendar.svg"
            />
            <span>Today</span>
          </button>
          <button className={TaskStyles['task-time_settings_start']}>
            <img
              alt="start time"
              src="clock.svg"
            />
            <span>00:00</span>
          </button>
          <button className={TaskStyles['task-time_settings_end']}>
            <img
              alt="end time"
              src="clock.svg"
            />
            <span>00:00</span>
          </button>
        </div>
        <div className={TaskStyles['task-notification_settings']}>
          <div className={TaskStyles['task-notification_time']}>
            <img
              alt="notification"
              src="bell.svg"
            />
            <p>10 minutes before</p>
          </div>
          <img
            alt="close"
            src="close.svg"
          />
        </div>
      </div>
      <div className={TaskStyles['task-popup_actions']}>
        <button
          className={TaskStyles['task-popup_cancel']}
          onClick={() => setVisible(false)}
        >
          Cancel
        </button>
        <button
          className={TaskStyles['task-popup_add']}
          onClick={saveTodo}
        >
          Add
        </button>
      </div>
    </TaskPopupWrapper>
  )
}
