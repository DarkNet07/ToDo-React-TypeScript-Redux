import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import ToDoState from './State';
import { ToDo } from './ToDo';

const initialState: ToDoState = {
  ToDoList: [],
};

export const updateToDoStatus = createAsyncThunk(
  'toDo/update/status',
  ({ id, toDos }: { id: ToDo['id']; toDos: ToDo[] }) => {
    return api.fetchToDoCheck(id, toDos);
  }
);
export const updateToDo = createAsyncThunk('toDo/update', (updToDo: ToDo) => {
  return api.fetchUpdateToDo(updToDo);
});

export const deleteToDo = createAsyncThunk('toDo/delete', (id: ToDo['id']) => {
  return api.fetchToDoDelete(id);
});

export const createNewToDo = createAsyncThunk(
  'toDo/create',
  (newToDo: ToDo) => {
    return api.fetchCreateNewToDo(newToDo);
  }
);

export const loadToDos = createAsyncThunk('toDos/load', () =>
  api.fetchLoadToDos()
);

const ToDoSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateToDoStatus.fulfilled, (state, action) => {
      state.ToDoList = state.ToDoList.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    });

    builder.addCase(loadToDos.fulfilled, (state, action) => {
      state.ToDoList = action.payload;
    });
    builder.addCase(updateToDo.fulfilled, (state, action) => {
      state.ToDoList = state.ToDoList.map((todo) =>
        todo.id === action.payload?.id ? action.payload : todo
      );
    });
    builder.addCase(createNewToDo.fulfilled, (state, action) => {
      action.payload && state.ToDoList.push(action.payload);
    });

    builder.addCase(deleteToDo.fulfilled, (state, action) => {
      state.ToDoList = state.ToDoList.filter(
        (toDo) => toDo.id !== action.payload
      );
    });
  },
});
export default ToDoSlice.reducer;
