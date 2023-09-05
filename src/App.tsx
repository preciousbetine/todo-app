import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import DatePicker from './components/DatePicker';
import HorizontalDateSelect from './components/HorizontalDateSelect';
import Task from './components/Task';
import AddTask from './components/AddTask';
import AddTaskPopup from './components/Popup/AddTaskPopup';
import { TodoState } from './redux/slices/todo';
import TodoAppStyles from './styles/TodoApp.module.scss';
import TaskDetails from './components/TaskDetails';
import EditTask from './components/EditTask';
import Pagination from './components/Pagination';

function TodoApp() {
  const [period, setPeriod] = useState<string>('morning');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [taskPopupVisible, setTaskPopupVisible] = useState<boolean>(false);
  const todos = useSelector((s:  { todos: TodoState }) => s.todos).todos;
  const [panelContent, setPanelContent] = useState<string>('date-picker');
  const [currentTaskId, setCurrentTaskId] = useState<string>('');

  const taskHeading = React.createRef<HTMLHeadingElement>();

  const taskComponents = todos.slice((currentPage - 1) * 7, currentPage * 7).map(task => {
    return (
      <Task
        key={task.id}
        show={() => {
          setPanelContent('show-task');
          setCurrentTaskId(task.id);
        }}
        {...task}
      />
    );
  });

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 12 && hour < 18) {
      setPeriod('afternoon');
    } else if (hour >= 18) {
      setPeriod('evening');
    }
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className={TodoAppStyles.welcome}>
        <div>
          <h1>Good {period}!</h1>
          <p>You got some task to do.</p>
        </div>
        <button
          className={TodoAppStyles['add-task-btn']}
          onClick={() => {setPanelContent('add-task')}}
        >
          <img className={TodoAppStyles.svg} src="plus.svg" alt="" />
          <span>Create New Task</span>
        </button>
      </div>
      <section className={TodoAppStyles.application}>
        <div className={TodoAppStyles.main}>
          <HorizontalDateSelect />
          <div className={TodoAppStyles['tasks-container']}>
            <h2 ref={taskHeading}>My Tasks</h2>
            <div className={TodoAppStyles.tasks}>
              {taskComponents}
            </div>
            <Pagination
              className={TodoAppStyles.pagination}
              currentPage={currentPage}
              totalCount={todos.length}
              pageSize={7}
              onPageChange={(page) => setCurrentPage(Number(page))}
            />
          </div>
        </div>
        <div className={TodoAppStyles['side-panel']}>
          { panelContent === 'date-picker' && <DatePicker /> }
          { panelContent === 'add-task' && <AddTask close={() => setPanelContent('date-picker')} /> }
          {
            panelContent === 'show-task' && (
              <TaskDetails
                task={
                  todos.find(task => task.id === currentTaskId) || todos[0]
                }
                close={() => setPanelContent('date-picker')}
                edit={() => setPanelContent('edit-task')}
              />
            )
          }
          {
            panelContent === 'edit-task' && (
              <EditTask
                task={
                  todos.find(task => task.id === currentTaskId) || todos[0]
                }
                close={() => setPanelContent('show-task')}
              />
            )
          }
        </div>
      </section>
      <button
        className={TodoAppStyles['add-task']}
        onClick={() => {setTaskPopupVisible(true)}}
      >
        <span>Input Task</span>
        <img className={TodoAppStyles.svg} src="microphone.svg" alt="" />
      </button>
      <AddTaskPopup id="new-task" visible={taskPopupVisible} setVisible={() => setTaskPopupVisible(false)} />
    </>
  )
}

export default TodoApp;
