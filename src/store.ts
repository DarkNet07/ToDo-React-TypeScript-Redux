import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import ToDoSlice from './features/toDo/Toolkit/ToDoSlice';
import UserSlice from './features/user/toolkit/UserSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    toDo: ToDoSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
