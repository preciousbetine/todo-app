import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import { fetchTodos } from './redux/slices/todo.ts';

store.dispatch(fetchTodos());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
