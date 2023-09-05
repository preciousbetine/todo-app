import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch } from '../redux/store';
import { Todo, removeTodo } from '../redux/slices/todo';
import { addOrdinalSuffix } from '../utils/date';
import TaskStyles from '../styles/TaskPopup.module.scss';

export default function TaskDetails({
  close,
  edit,
  task,
} : {
  close: () => void,
  edit: () => void,
  task: Todo
} ) {
  const dispatch = useDispatch<AppDispatch>();

  const deleteTodo = () => {
    dispatch(removeTodo(task.id));
    toast('Task deleted successfully!', {
      type: 'success',
      icon: '☑️',
      position: 'bottom-left',
      progressClassName: TaskStyles['task-toast_progress'],
    });
    close();
  };

  if (!task) {
    setTimeout(() => close(), 1000);
    return <></>;
  }

  return (
    <div className={TaskStyles['task-card']}>
      <div className={TaskStyles['task-popup_content']}>
        <div className={TaskStyles['task-popup_header']}>
          <span />
          <button
            type="button"
            onClick={close}
          >
            <img alt="close" src="close.svg" />
          </button>
        </div>
        <div className={TaskStyles['task-details']}>
          <h3>{task.title}</h3>
          <div>
            <div className={TaskStyles['task-detail_item']}>
              <img src="calendar-blue.svg" alt="date" />
              <span>
                {
                  addOrdinalSuffix(new Date(task.date))
                }
              </span>
            </div>
            <div className={TaskStyles['task-detail_item']}>
              <img src="clock-blue.svg" alt="start time" />
              <span>
                {
                  (() => {
                    if (task.startTime.trim() === '') return ''
                    const date = new Date("1970-01-01T" + task.startTime);
                    let hours = date.getHours();
                    const minutes = date.getMinutes();
                    const amOrPm = hours >= 12 ? 'pm' : 'am';

                    hours = hours % 12 || 12;
                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
                  })()
                }
                {' '}
                {
                  task.endTime === '00:00' ? '' : `${
                    (() => {
                      if (task.endTime.trim() === '') return ''
                      const date = new Date("1970-01-01T" + task.endTime);
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
          onClick={edit}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
