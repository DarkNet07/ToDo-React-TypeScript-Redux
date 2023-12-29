import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UserState from './State';
import { User, UserLogin } from './User';

const initialState: UserState = {
  Users: [],
  LogginedUser: null,
};

export const loadUsers = createAsyncThunk('users/load', () =>
  api.fetchLoadUsers()
);
export const registerNewUser = createAsyncThunk('user/register', (newUser: User) =>
  api.fetchRegisterUser(newUser)
);
export const loginUser = createAsyncThunk('user/logIn', (logUser: UserLogin) =>
  api.fetchLoginUser(logUser)
);

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOut: (state) => {
      state.LogginedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.Users = action.payload;
    });
    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      action.payload && state.Users.push(action.payload);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.LogginedUser = action.payload;
    });
  },
});
export default UserSlice.reducer;
export const { logOut } = UserSlice.actions;
