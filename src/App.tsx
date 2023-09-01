import { useEffect, useState } from 'react';
import Header from './components/Header';
import HorizontalDateSelect from './components/HorizontalDateSelect';
import Task from './components/Task';
import AddTaskPopup from './components/Popup/AddTaskPopup';
import TodoAppStyles from './styles/TodoApp.module.scss';

function TodoApp() {
  const [period, setPeriod] = useState<string>('morning');
  const [taskPopupVisible, setTaskPopupVisible] = useState<boolean>(false);

  const tasks = [
    {
      id: 1,
      title: 'Task 1',
      date: '2021-09-01',
      startTime: '09:00',
      endTime: '10:00',
    },
  ]

  const taskComponents = tasks.map(task => {
    return (
      <Task
        key={task.id}
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
      <section className={TodoAppStyles.application}>
        <div className={TodoAppStyles.welcome}>
          <h1>Good {period}!</h1>
          <p>You got some task to do.</p>
        </div>
        <HorizontalDateSelect />
        <div className={TodoAppStyles['tasks-container']}>
          <h2>My Tasks</h2>
          <div className={TodoAppStyles.tasks}>
            {taskComponents}
          </div>
        </div>
      </section>
      <button
        className={TodoAppStyles['add-task']}
        onClick={() => {setTaskPopupVisible(true)}}
      >
        <span>Input Task</span>
        <img className={TodoAppStyles.svg} src="microphone.svg" alt="" />
      </button>
      <AddTaskPopup visible={taskPopupVisible} setVisible={() => setTaskPopupVisible(false)} />
    </>
  )
}

export default TodoApp
