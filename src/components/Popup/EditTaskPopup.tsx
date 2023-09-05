import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../redux/store';
import { updateTodo } from '../../redux/slices/todo';
import TaskStyles from '../../styles/TaskPopup.module.scss';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';

export default function EditTaskPopup({
  id,
  visible,
  setVisible,
  title,
  startTime,
  endTime,
  date,
  completed,
}: TaskPopupProps) {
  const [editTitle, setEditTitle] = useState<string>(title || '');
  const [editStartTime, setStartTime] = useState<string>(startTime || '00:00');
  const [editEndTime, setEndTime] = useState<string>(endTime || '00:00');
  const [editDate, setDate] = useState<string>(date || new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch<AppDispatch>();

  const saveTask = () => {
    console.log(
      id,
      title,
      startTime,
      endTime,
      date,
      completed,
    )
    dispatch(updateTodo({
      id,
      title: editTitle,
      startTime: editStartTime,
      endTime: editEndTime,
      date: editDate,
      completed: completed || false,
    }));
    toast('Task updated successfully!', {
      type: 'success',
      icon: '☑️',
      position: 'bottom-left',
      progressClassName: TaskStyles['task-toast_progress'],
    });
    setVisible(false);
  };

  return (
    <TaskPopupWrapper id={id} visible={visible} setVisible={setVisible} fullScreen>
      <div className={TaskStyles['task-popup_content']}>
        <div className={TaskStyles['task-popup_header']}>
          <h3>Edit Task</h3>
          <button
            type="button"
            onClick={() => setVisible(false)}>
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
            <input type="date" value={editDate} onChange={(e) => setDate(e.target.value)} />
          </button>
          <button className={TaskStyles['task-time_settings_start']}>
            <input type="time" value={editStartTime} onChange={(e) => setStartTime(e.target.value)} />
          </button>
          <button className={TaskStyles['task-time_settings_end']}>
            <input type="time" value={editEndTime} onChange={(e) => setEndTime(e.target.value)} />
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
          className={TaskStyles['task-popup_save']}
          onClick={saveTask}
          disabled={!editTitle.trim().length}
        >
          Save
        </button>
      </div>
    </TaskPopupWrapper>
  )
}
