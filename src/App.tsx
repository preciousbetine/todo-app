import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store';
import Header from './components/Header';
import DatePicker from './components/DatePicker';
import HorizontalDateSelect from './components/HorizontalDateSelect';
import Task from './components/Task';
import AddTask from './components/AddTask';
import AddTaskPopup from './components/Popup/AddTaskPopup';
import { TodoState, getTodos } from './redux/slices/todo';
import TodoAppStyles from './styles/TodoApp.module.scss';
import TaskDetails from './components/TaskDetails';
import EditTask from './components/EditTask';

function TodoApp() {
  const [period, setPeriod] = useState<string>('morning');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [pageButtons, setPageButtons] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch<AppDispatch>();
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
    taskHeading.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentPage, taskHeading]);

  useEffect(() => {
    const buttons = [];
    const noOfPages = Math.ceil(todos.length / 7);
    setNumPages(noOfPages);

    for (let i = 1; i <= noOfPages; i++) {
      buttons.push(
        <button
          key={i}
          className={TodoAppStyles['page-btn']}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    setPageButtons(buttons);
  }, [todos]);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 12 && hour < 18) {
      setPeriod('afternoon');
    } else if (hour >= 18) {
      setPeriod('evening');
    }

    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      <Header />
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
            <div className={TodoAppStyles.pagination}>
              <button
                className={TodoAppStyles['prev-btn']}
                onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }}
              >
                <img src="arrow-left.svg" alt="" />
                Previous
              </button>
              <div className={TodoAppStyles['page-num']}>
                {pageButtons}
              </div>
              <button
                className={TodoAppStyles['next-btn']}
                onClick={() => {
                  if (currentPage < numPages) setCurrentPage(currentPage + 1);
                }}
              >
                Next
                <img src="arrow-right.svg" alt="" />
              </button>
            </div>
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

export default TodoApp
