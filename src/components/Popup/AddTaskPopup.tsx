import { useState } from 'react';
import { v5 as uuidv5 } from 'uuid';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addTodo } from '../../redux/slices/todo';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';
import TaskStyles from '../../styles/TaskPopup.module.scss';

export default function AddTaskPopup({ id, visible, setVisible }: TaskPopupProps) {
  const [title, setTitle] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endTime, setEndTime] = useState<string>('00:00');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [notif, setNotif] = useState<boolean>(true);

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
    toast('Task added successfully!', {
      type: 'success',
      icon: '☑️',
      position: 'bottom-left',
      progressClassName: TaskStyles['task-toast_progress'],
    });

    setTitle('');
    setStartTime('00:00');
    setEndTime('00:00');
    setDate(new Date().toISOString().slice(0, 10));
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
        <div
          className={TaskStyles['task-notification_settings']}
          style={{ display: notif ? 'flex' : 'none' }}
        >
          <div className={TaskStyles['task-notification_time']}>
            <img
              alt="notification"
              src="bell.svg"
            />
            <p>10 minutes before</p>
          </div>
          <button onClick={() => setNotif(false)}>
            <img
              alt="close"
              src="close.svg"
            />
          </button>
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
