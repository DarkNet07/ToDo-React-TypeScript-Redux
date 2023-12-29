export type User = {
  id: number;
  name?: string;
  email: string;
  password: string;
};
export type UserLogin = Omit<User, 'id' >;