import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { store, userAction } from "../Redux/store";
import { errorHandler } from "../Utils/ErrorHandler";
import { notify } from "../Utils/Notify";
import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";

class UserService {
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

  public async register(user: UserModel) {
    try {
      const response = await axios.post<string>(appConfig.register, user);
      const token = response.data;

      localStorage.setItem("token", token);

      const container = jwtDecode<UserModel>(token);
      const dbUser = container;

      const action = userAction.initUser(dbUser);
      store.dispatch(action);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  public async login(credentials: CredentialsModel) {
    try {
      const response = await axios.post<string>(appConfig.login, credentials);
      const token = response.data;

      localStorage.setItem("token", token);

      const container = jwtDecode<UserModel>(token);
      const dbUser = container;

      const action = userAction.initUser(dbUser);
      store.dispatch(action);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  public logout() {
    localStorage.removeItem("token");
    const action = userAction.logout();
    store.dispatch(action);
  }
}

export const userService = new UserService();
