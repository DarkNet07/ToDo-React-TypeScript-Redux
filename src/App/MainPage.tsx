import { useEffect, useState } from 'react';
import ToDoList from '../features/toDo/ToDoList';
import Modal from '../features/modal/Modal';
import { AddForm } from '../features/toDo/AddForm';
import {useAppDispatch } from '../store';
import { loadUsers } from '../features/user/toolkit/UserSlice';

function MainPage() {
  const [addModal, setAddModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <div>
      {' '}
      <ToDoList />
      {addModal && (
        <Modal title="Добавить новую задачу" onClose={() => setAddModal(false)}>
          <AddForm onClose={() => setAddModal(false)} />
        </Modal>
      )}
      <button
        type="button"
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
        onClick={() => setAddModal(true)}
      >
        +
      </button>
    </div>
  );
}

export default MainPage;
