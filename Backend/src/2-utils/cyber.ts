import crypto from "crypto";
import { IUserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "../3-models/enums";

class Cyber {
  private secretKey = "TheAmazing4578-99Students!";
  private hashingSalt = "MakeThingsGoRight!!!";

  public hash(plaintext: string): string {
    return crypto
      .createHmac("SHA-512", this.hashingSalt)
      .update(plaintext)
      .digest("hex");
  }

  public generateNewToken(user: IUserModel): string {
    const copyUser: IUserModel = JSON.parse(JSON.stringify(user));

    delete copyUser.password;

    const option: SignOptions = { expiresIn: "3h" };

    const token = jwt.sign(copyUser, this.secretKey, option);

    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      if (!token) return false;

      jwt.verify(token, this.secretKey);

      return true;
    } catch (error: any) {
      return false;
    }
  }

  public isAdmin(token: string): boolean {
    try {
      if (!token) return false;

      const container = jwt.decode(token) as { user: IUserModel };

      const user = container.user;

      return user.roleId === Role.Admin;
    } catch (error: any) {
      return false;
    }
  }
}
export const cyber = new Cyber();
