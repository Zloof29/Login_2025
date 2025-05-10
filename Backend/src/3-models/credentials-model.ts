export class credentialsModel {
  public email: string;
  public password: string;
  public currentEmail?: string;

  public constructor(user: credentialsModel) {
    this.email = user.email;
    this.password = user.password;
    this.currentEmail = user.currentEmail;
  }
}
