import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { store, userAction } from "../Redux/store";
import { errorHandler } from "../Utils/ErrorHandler";

export class UserService {
  public constructor() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const container = jwtDecode<UserModel>(token);
      const dbUser = container;
      const action = userAction.initUser(dbUser);
      store.dispatch(action);
    } catch (error: any) {
      console.log(errorHandler.getError(error));
    }
  }
}
