import { useState } from 'react';
import { v5 as uuidv5 } from 'uuid';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addTodo } from '../../redux/slices/todo';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';
import TaskStyles from '../../styles/TaskPopup.module.scss';

export default function AddTaskPopup({ id, visible, setVisible }: TaskPopupProps) {
  const [title, setTitle] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

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
    setStartTime('');
    setEndTime('');
    setDate('');
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
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </button>
          <button className={TaskStyles['task-time_settings_start']}>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </button>
          <button className={TaskStyles['task-time_settings_end']}>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
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
          disabled={!title.trim().length}
        >
          Add
        </button>
      </div>
    </TaskPopupWrapper>
  )
}
