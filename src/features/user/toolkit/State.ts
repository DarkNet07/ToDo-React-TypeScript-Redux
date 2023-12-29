import { User, UserLogin } from './User';

type UserState = {
  Users: User[];
  LogginedUser: UserLogin | null;
};

export default UserState;
