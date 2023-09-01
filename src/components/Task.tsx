import { useState } from 'react';
import TaskDetailsPopup from './Popup/TaskDetailsPopup';
import TaskStyles from '../styles/Task.module.scss';

interface TaskProps {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

function Task({ id, title, date, startTime, endTime }: TaskProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [taskDetailsVisible, setTaskDetailsVisible] = useState<boolean>(false);
  const toggleTaskCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <>
      <TaskDetailsPopup
        visible={taskDetailsVisible}
        setVisible={setTaskDetailsVisible}
        id={id}
        title={title}
        date={date}
        startTime={startTime}
        endTime={endTime}
      />
      <div
        className={TaskStyles.task}
      >
        <div className={TaskStyles['task-check_details']}>
          <label className={TaskStyles['check-container']}>
            <input
              type="checkbox"
              onChange={toggleTaskCompleted}
              checked={isCompleted}
            />
            <span className={TaskStyles.checkmark} />
          </label>
          <button
            className={TaskStyles['task-details']}
            type="button"
            onClick={() => setTaskDetailsVisible(true)}
          >
            <h3 className={isCompleted && TaskStyles.completed || ''}>{title}</h3>
            <p className={isCompleted && TaskStyles.completed || ''}>
              {startTime}
              {' '}
              -
              {' '}
              {endTime}
            </p>
          </button>
        </div>
        <span className={TaskStyles.day}>{date}</span>
      </div>
    </>
  )
}

export default Task;