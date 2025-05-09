import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axiosInstance.get<Todo[]>('/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
  const response = await axiosInstance.post<Todo>('/todos', { title });
  return response.data;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id: number) => {
  const response = await axiosInstance.post<Todo>(`/todos/${id}/toggle`);
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '할일 목록을 불러오지 못했습니다.';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const idx = state.todos.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.todos[idx] = action.payload;
      });
  },
});

export default todoSlice.reducer; 