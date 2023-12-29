import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { createNewToDo } from './Toolkit/ToDoSlice';

export const AddForm = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const toDos = useSelector((state: RootState) => state.toDo.ToDoList);

  const dispatch = useAppDispatch();

  const lastToDoId =
    toDos.length > 0
      ? toDos?.reduce((maxId, todo) => Math.max(maxId, todo.id), 0)
      : 0;
  function handleAddNew(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newToDo = {
      id: +lastToDoId + 1,
      name,
      description,
      date,
      isDone: false,
    };
    dispatch(createNewToDo(newToDo));
    onClose();
  }

  return (
    <div className="container">
      <form className=" flex flex-col gap-7" onSubmit={handleAddNew}>
        <label>
          Название задачи
          <br />
          <input
            type="text"
            placeholder="Название"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          Описание задачи
          <br />
          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Срок выполнения задачи
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};
