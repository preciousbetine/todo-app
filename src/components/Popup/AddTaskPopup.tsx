import TaskStyles from '../../styles/TaskPopup.module.scss';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';

export default function AddTaskPopup({ visible, setVisible }: TaskPopupProps) {
  return (
    <TaskPopupWrapper visible={visible} setVisible={setVisible}>
      <div className={TaskStyles['task-popup_content']}>
        <div className={TaskStyles['task-popup_header']}>
          <h3>Add Task</h3>
          <button
            type="button"
            onClick={() => setVisible(false)}>
            <img alt="close" src="close.svg" />
          </button>
        </div>
        <textarea className={TaskStyles['task-popup_description']} />
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
        <button className={TaskStyles['task-popup_add']}>Add</button>
      </div>
    </TaskPopupWrapper>
  )
}
