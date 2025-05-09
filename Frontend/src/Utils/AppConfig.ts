class AppConfig {
  public readonly register = "http://localhost:4000/api/register/";
  public readonly login = "http://localhost:4000/api/login/";
  public readonly resetPassword = "http://localhost:4000/api/resetPassword/";
  public readonly changeEmail = "http://localhost:4000/api/changeEmail/";
}

export const appConfig = new AppConfig();
