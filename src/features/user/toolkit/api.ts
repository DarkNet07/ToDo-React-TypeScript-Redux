import { User, UserLogin } from './User';

export const fetchLoadUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
};
export const fetchRegisterUser = async (newUser: User): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
export const fetchLoginUser = async (
  logUser: UserLogin
): Promise<User | null> => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: User[] = await response.json();
    const logginedUser = data.find(
      (user) =>
        user.email === logUser.email && user.password === logUser.password
    );
    if (logginedUser) return logginedUser;
    else return null;
  } catch (error) {
    console.log(error);
  }
};
