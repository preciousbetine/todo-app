import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );
      if (resp.status === 200) {
        return resp.data;
      }
      return thunkAPI.rejectWithValue(resp.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: { payload: Todo }) => {
      state.todos.unshift(action.payload);
      // state.todos.sort((a, b) => {
      //   if (a.date > b.date) return 1;
      //   if (a.date < b.date) return -1;
      //   return 0;
      // });
    },
    removeTodo: (state, action: { payload: string }) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: { payload: Todo }) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = action.payload.title;
        todo.date = action.payload.date;
        todo.startTime = action.payload.startTime;
        todo.endTime = action.payload.endTime;
      }
    },
    updateTodoCompletedStatus: (state, action: { payload: { id: string; completed: boolean } }) => {
      const { id, completed } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = completed;
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.ready = false;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.ready = true;

      // generate random time string between 00:00 and 12:00

      const randomStartTime = () => {
        const hours = Math.floor(Math.random() * 12);
        const minutes = Math.floor(Math.random() * 60);
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return time;
      };

      // generate random time string between 12:00 and 23:59

      const randomEndTime = () => {
        const hours = Math.floor(Math.random() * 12) + 12;
        const minutes = Math.floor(Math.random() * 60);
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return time;
      };

      // generate random date string between today and 2 weeks from now

      const randomDate = () => {
        const today = new Date();
        const randomDay = Math.floor(Math.random() * 60);
        const randomDate = new Date(today.setDate(today.getDate() + randomDay));
        const date = randomDate.toISOString().split('T')[0];
        return date;
      };

      const todos = action.payload.map((todo: Todo) => ({
        id: todo.id,
        title: todo.title.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').slice(0, 20),
        date: randomDate(),
        startTime: randomStartTime(),
        endTime: randomEndTime(),
        completed: todo.completed,
      }));

      state.todos = todos;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.ready = true;
      state.error = action.payload as string;
    });
  }
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  updateTodoCompletedStatus,
} = todosSlice.actions;

export default todosSlice.reducer;
