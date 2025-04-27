export class credentialsModel {
  public email: string;
  public password: string;

  public constructor(user: credentialsModel) {
    this.email = user.email;
    this.password = user.password;
  }
}
