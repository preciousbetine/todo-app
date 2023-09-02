import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import TaskDetailsPopup from './Popup/TaskDetailsPopup';
import TaskStyles from '../styles/Task.module.scss';
import { updateTodoCompletedStatus } from '../redux/slices/todo';

interface TaskProps {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  completed: boolean,
  show: () => void,
}

function Task({ id, title, date, startTime, endTime, completed, show }: TaskProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [taskDetailsVisible, setTaskDetailsVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const toggleTaskCompleted = () => {
    setIsCompleted(!isCompleted);
    dispatch(updateTodoCompletedStatus({ id, completed: !isCompleted }));
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
            onClick={() => {
              show();
              setTaskDetailsVisible(true);
            }}
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
