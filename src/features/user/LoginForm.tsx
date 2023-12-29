import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { loginUser } from './toolkit/UserSlice';

export const LoginForm = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const logUser = {
      email,
      password,
    };
    dispatch(loginUser(logUser));
    onClose();
  }

  return (
    <div className="container">
      <form className=" flex flex-col gap-7" onSubmit={handleLogin}>
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
        <button type="submit">Вход</button>
      </form>
    </div>
  );
};
