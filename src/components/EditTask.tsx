import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Todo, updateTodo } from '../redux/slices/todo';
import TaskStyles from '../styles/TaskPopup.module.scss';

export default function EditTask({
  close,
  task,
} : {
  close: () => void,
  task: Todo
} ) {
  const [editTitle, setEditTitle] = useState<string>(task.title || '');
  const [startTime, setStartTime] = useState<string>(task.startTime);
  const [endTime, setEndTime] = useState<string>(task.endTime);
  const [date, setDate] = useState<string>(task.date);

  const dispatch = useDispatch<AppDispatch>();

  const saveTask = () => {
    dispatch(updateTodo({
      id: task.id,
      title: editTitle,
      startTime: startTime,
      endTime: endTime,
      date: date,
      completed: task.completed || false,
    }));
    close();
  };

  return (
    <div className={TaskStyles['task-card']}>
      <div className={TaskStyles['task-popup_content']}>
        <div className={TaskStyles['task-popup_header']}>
          <h3>Edit Task</h3>
          <button
            type="button"
            onClick={close}>
            <img alt="close" src="close.svg" />
          </button>
        </div>
        <textarea
          className={TaskStyles['task-popup_description']}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
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
          <button>
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
          onClick={close}
        >
          Cancel
        </button>
        <button
          className={TaskStyles['task-popup_save']}
          onClick={saveTask}
          disabled={!editTitle.trim().length}
        >
          Save
        </button>
      </div>
    </div>
  )
}
