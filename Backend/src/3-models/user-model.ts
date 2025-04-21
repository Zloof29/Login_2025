import { Document, Schema, model } from "mongoose";
import { Role } from "./enums";

export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: Role;
}

export const UserSchema = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      minlength: [2, "First name must be gte to 2."],
      maxlength: [50, "First name must be lte to 50."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      minlength: [2, "Last name must be gte to 2."],
      maxlength: [50, "Last name must be lte to 50."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      minlength: [10, "Email must be gte to 10."],
      maxlength: [100, "Email must be lte to 100."],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be gte to 8."],
      maxlength: [128, "Password must be lte to 128."],
    },
    roleId: {
      type: String,
      required: [true, "RoleId is required."],
    },
  },
  { versionKey: false, timestamps: true, id: false }
);

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");
