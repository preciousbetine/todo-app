import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { removeTodo } from '../../redux/slices/todo';
import EditTaskPopup from './EditTaskPopup';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';
import { addOrdinalSuffix } from '../../utils/date';
import TaskStyles from '../../styles/TaskPopup.module.scss';

interface TaskDetailsPopupProps extends TaskPopupProps {
  date: string;
}

export default function TaskDetailsPopup({
  id,
  visible,
  setVisible,
  title,
  date,
  startTime,
  endTime,
  completed,
}: TaskDetailsPopupProps) {
  const [editing, setEditing] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const deleteTodo = () => {
    setVisible(false);
    dispatch(removeTodo(id));
    toast('Task deleted successfully!', {
      type: 'success',
      icon: '☑️',
      position: 'bottom-left',
      progressClassName: TaskStyles['task-toast_progress'],
    });
  };

  if (!id) {
    setVisible(false);
  }

  return (
    <TaskPopupWrapper id={id} visible={visible} setVisible={setVisible} fullScreen>
      <EditTaskPopup
        id={id}
        visible={editing}
        setVisible={setEditing}
        title={title}
        date={date}
        startTime={startTime}
        endTime={endTime}
        completed={completed}
        fullScreen
      />
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
              <span>
                {
                  addOrdinalSuffix(new Date(date))
                }
              </span>
            </div>
            <div className={TaskStyles['task-detail_item']}>
              <img src="clock-blue.svg" alt="start time" />
              <span>
                {
                  (() => {
                    if (startTime?.trim() === '') return ''
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
                      if (endTime?.trim() === '') return ''
                      const date = new Date("1970-01-01T" + endTime);
                      let hours = date.getHours();
                      const minutes = date.getMinutes();
                      const amOrPm = hours >= 12 ? 'pm' : 'am';

                      hours = hours % 12 || 12;
                      return `- ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
                    })()
                  }`
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={TaskStyles['task-popup_actions']}>
        <button
          className={TaskStyles['task-popup_delete']}
          onClick={() => deleteTodo()}
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
