import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../features/modal/Modal';
import { RegistrationForm } from '../features/user/RegistrationForm';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { logOut } from '../features/user/toolkit/UserSlice';
import { LoginForm } from '../features/user/LoginForm';

export default function Header(): JSX.Element {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const logUser = useSelector((state: RootState) => state.user.LogginedUser);

  const dispatch = useAppDispatch();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(logOut());
    window.location.reload();
  };

  return (
    <nav className="w-full bg-indigo-200 fixed border-gray-200">
      <div className="max-w-screen-lg gap-5 flex flex-wrap items-center justify-between mx-auto py-4">
        <Link className="underline font-bold" to="/">
          Самый лучший планировщик
        </Link>

        {logUser ? (
          <>
            Добро пожаловать {logUser.name}
            <button
              onClick={handleLogout}
              type="button"
              className="border-double border-4 border-green-400 p-2  hover:bg-indigo-500 hover:text-white"
            >
              Выйти
            </button>
          </>
        ) : (
          <div className="flex gap-5">
            <button
              onClick={() => setSignUp(true)}
              type="button"
              className="border-double border-4 border-green-400 p-2  hover:bg-indigo-500 hover:text-white"
            >
              Регистрация
            </button>
            <button
              onClick={() => setSignIn(true)}
              type="button"
              className="border-double border-4 border-green-400 p-2  hover:bg-indigo-500 hover:text-white"
            >
              Войти
            </button>
          </div>
        )}
      </div>
      {signUp && (
        <Modal title="Форма регистрации" onClose={() => setSignUp(false)}>
          <RegistrationForm onClose={() => setSignUp(false)} />
        </Modal>
      )}
      {signIn && (
        <Modal
          title="Введите email и пароль для входа"
          onClose={() => setSignIn(false)}
        >
          <LoginForm onClose={() => setSignIn(false)} />
        </Modal>
      )}
    </nav>
  );
}
