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
              {
                (() => {
                  if (startTime.trim() === '') return ''
                  const date = new Date("1970-01-01T" + startTime);
                  let hours = date.getHours();
                  const minutes = date.getMinutes();
                  const amOrPm = hours >= 12 ? 'pm' : 'am';

                  hours = hours % 12 || 12;
                  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
                })()
              }
              {' '}
              {
                endTime === '00:00' ? '' : `${
                  (() => {
                    if (endTime.trim() === '') return ''
                    const date = new Date("1970-01-01T" + endTime);
                    let hours = date.getHours();
                    const minutes = date.getMinutes();
                    const amOrPm = hours >= 12 ? 'pm' : 'am';

                    hours = hours % 12 || 12;
                    return `- ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
                  })()
                }`
              }
            </p>
          </button>
        </div>
        <span className={TaskStyles.day}>
          {
            date === new Date().toISOString().slice(0, 10) ? 'Today' : date
          }
        </span>
      </div>
    </>
  )
}

export default Task;
