import { useState } from 'react';
import EditTaskPopup from './EditTaskPopup';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';
import TaskStyles from '../../styles/TaskPopup.module.scss';

export default function TaskDetailsPopup({
  visible,
  setVisible,
  title,
  date,
  startTime,
  endTime,
}: TaskPopupProps) {
  const [editing, setEditing] = useState<boolean>(false);
  return (
    <TaskPopupWrapper visible={visible} setVisible={setVisible} fullScreen>
      <EditTaskPopup visible={editing} setVisible={setEditing} title={title} fullScreen />
      <div className={TaskStyles['task-popup_content']}>
        <div className={TaskStyles['task-popup_header']}>
          <span />
          <button
            type="button"
            onClick={() => setVisible(false)}>
            <img alt="close" src="close.svg" />
          </button>
        </div>
        <div className={TaskStyles['task-details']}>
          <h3>{title}</h3>
          <div>
            <div className={TaskStyles['task-detail_item']}>
              <img src="calendar-blue.svg" alt="date" />
              <span>{date}</span>
            </div>
            <div className={TaskStyles['task-detail_item']}>
              <img src="clock-blue.svg" alt="start time" />
              <span>
                {startTime}
                {' '}
                -
                {' '}
                {endTime}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={TaskStyles['task-popup_actions']}>
        <button
          className={TaskStyles['task-popup_delete']}
          onClick={() => setVisible(false)}
        >
          Delete
        </button>
        <button
          className={TaskStyles['task-popup_edit']}
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      </div>
    </TaskPopupWrapper>
  );
}
