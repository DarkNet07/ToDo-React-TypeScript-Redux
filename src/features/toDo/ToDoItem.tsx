// import React from 'react'
import { useSelector } from 'react-redux';
import { ToDo } from './Toolkit/ToDo';
import { RootState, useAppDispatch } from '../../store';
import { deleteToDo, updateToDo, updateToDoStatus } from './Toolkit/ToDoSlice';
import { useEffect, useState } from 'react';

type ToDoPropsType = {
  toDo: ToDo;
};
const ToDoItem = ({ toDo }: ToDoPropsType): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState<ToDo['name']>(toDo.name);
  const [description, setDescription] = useState<ToDo['description']>(
    toDo.description
  );
  const [date, setDate] = useState<ToDo['date']>(toDo.date);
  const [isDone, setIsDone] = useState<ToDo['isDone']>(toDo.isDone);
  const [isDelayed, setIsDelayed] = useState(false);
  const toDos = useSelector((state: RootState) => state.toDo.ToDoList);
  const today = +new Date();
  const toDoDateTerm = +new Date(toDo.date);

  const toggleDelayedToDo = () => {
    today - toDoDateTerm > 75000000 ? setIsDelayed(true) : setIsDelayed(false);
  };

  useEffect(() => {
    toggleDelayedToDo();
  }, []);

  const dispatch = useAppDispatch();

  function handleCheck(id: number, toDos: ToDo[]) {
    dispatch(updateToDoStatus({ id, toDos }));
  }

  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updToDo = { id: toDo.id, name, description, date, isDone };
    dispatch(updateToDo(updToDo));
    setShowEdit(false);
  }

  function handleDelete(id: ToDo['id']) {
    dispatch(deleteToDo(id));
  }

  return (
    <div
      className={`${
        !isDelayed ? 'item' : 'itemDelayed'
      } flex w-96 justify-center  flex-col gap-2 border-2 border-blue-200`}
    >
      <p className=" text-xl font-bold">{toDo.name}</p>
      <p>{toDo.description}</p>
      <p>{new Date(toDo.date).toLocaleDateString()}</p>
      <label>
        <strong>Статус: {toDo.isDone ? 'Выполнена' : 'Не выполнена'} </strong>
        <input
          type="checkbox"
          onChange={() => handleCheck(toDo.id, toDos)}
          checked={toDo.isDone}
        />
      </label>
      <div className="flex justify-around my-5 text-2xl">
        <div onClick={() => setShowEdit(true)} className="editToDo">
          ✍️
        </div>
        <div onClick={() => handleDelete(toDo.id)} className="deleteToDO">
          ❌
        </div>
      </div>
      {showEdit ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            placeholder="Название"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="checkbox"
            checked={isDone}
            onChange={(e) => setIsDone(e.target.checked)}
          />
          <button type="submit">Сохранить</button>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};

export default ToDoItem;
