import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Todo, removeTodo } from '../redux/slices/todo';
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
    close();
  };

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
              <span>{task.date}</span>
            </div>
            <div className={TaskStyles['task-detail_item']}>
              <img src="clock-blue.svg" alt="start time" />
              <span>
                {task.startTime}
                {' '}
                -
                {' '}
                {task.endTime}
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
