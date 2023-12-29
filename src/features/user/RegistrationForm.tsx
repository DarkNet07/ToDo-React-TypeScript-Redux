import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { registerNewUser } from './toolkit/UserSlice';


export const RegistrationForm = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const users = useSelector((state: RootState) => state.user.Users);

  const dispatch = useAppDispatch();

  const lastUserId =
    users?.length > 0
      ? users.reduce((maxId, todo) => Math.max(maxId, todo.id), 0)
      : 0;

  function handleAddNew(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newUser = {
      id: +lastUserId + 1,
      name,
      email,
      password,
      isDone: false,
    };
    dispatch(registerNewUser(newUser));
    onClose();
  }

  return (
    <div className="container">
      <form className=" flex flex-col gap-7" onSubmit={handleAddNew}>
        <label>
          Имя
          <br />
          <input
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          E-mail
          <br />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Пароль
          <br />
          <input
            type="password"
            value={password}
            placeholder="*****"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Регистрация</button>
      </form>
    </div>
  );
};
