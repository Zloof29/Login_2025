export class CredentialsModel {
  constructor(
    public email: string,
    public password: string,
    public currentEmail?: string
  ) {}
}
