import { UserModel } from "../Models/UserModel";
import { Action, PayloadAction } from "@reduxjs/toolkit";

export function initUser(
  currentState: UserModel,
  action: PayloadAction<UserModel>
) {
  const newState: UserModel = action.payload;
  return newState;
}

export function logout(currentState: UserModel, action: Action) {
  const newState: UserModel = null;
  return newState;
}
