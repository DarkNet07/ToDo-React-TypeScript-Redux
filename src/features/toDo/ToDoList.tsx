import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store.ts';
import { loadToDos } from './Toolkit/ToDoSlice.ts';
import ToDoItem from './ToDoItem.tsx';

function ToDoList() {

  const toDoList = useSelector((state: RootState) => state.toDo.ToDoList);
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(loadToDos());
  }, [dispatch]);

  return (
    <div className=" gap-10 justify-center items-center flex flex-col py-20">
      {toDoList.length > 0
        ? toDoList.map((toDo) => <ToDoItem toDo={toDo} key={toDo.id} />)
        : 'Loading...'}
    </div>
  );
}

export default ToDoList;
