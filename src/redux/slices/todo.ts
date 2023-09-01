import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface TodoState {
  ready: boolean;
  error: null | string;
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
  ready: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodos: (state) => {
      let todos = localStorage.getItem('todos');
      if (todos) {
        todos = JSON.parse(todos);
        if (Array.isArray(todos)) {
          state.todos.push(...todos as Todo[]);
        }
      }
    },
    addTodo: (state, action: { payload: Todo }) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    removeTodo: (state, action: { payload: string }) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    updateTodo: (state, action: { payload: Todo }) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = action.payload.title;
        todo.date = action.payload.date;
        todo.startTime = action.payload.startTime;
        todo.endTime = action.payload.endTime;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    updateTodoCompletedStatus: (state, action: { payload: { id: string; completed: boolean } }) => {
      const { id, completed } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = completed;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    }
  },
});

export const {
  addTodo,
  removeTodo,
  getTodos,
  updateTodo,
  updateTodoCompletedStatus,
} = todosSlice.actions;
export default todosSlice.reducer;
