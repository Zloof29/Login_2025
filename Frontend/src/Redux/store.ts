import { configureStore, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { initUser, logout } from "./reducers";

export type AppState = {
  user: UserModel;
};

const UserSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    initUser,
    logout,
  },
});

export const userAction = UserSlice.actions;

export const store = configureStore<AppState>({
  reducer: {
    user: UserSlice.reducer,
  },
});
