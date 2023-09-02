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
  const dispatch = useDispatch<AppDispatch>();

  const saveTask = () => {
    dispatch(updateTodo({
      id: task.id,
      title: editTitle,
      startTime: task.startTime || '',
      endTime: task.endTime || '',
      date: task.date || '',
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
            <span>{task.startTime}</span>
          </button>
          <button className={TaskStyles['task-time_settings_end']}>
            <img
              alt="end time"
              src="clock.svg"
            />
            <span>{task.endTime}</span>
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
          onClick={close}
        >
          Cancel
        </button>
        <button
          className={TaskStyles['task-popup_save']}
          onClick={saveTask}
        >
          Save
        </button>
      </div>
    </div>
  )
}
