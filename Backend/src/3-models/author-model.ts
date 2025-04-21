import { Document, Schema, model } from "mongoose";

// 1. Interface
export interface IAuthorModel extends Document {
    firstName: string;
    lastName: string;
}

// 2. Schema
export const AuthorSchema = new Schema<IAuthorModel>({
    firstName: {
        type: String,
        required: [true, "Missing first name."],
        minlength: [2, "First name too short."],
        maxlength: [30, "First name too long."],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Missing last name."],
        minlength: [2, "Last name too short."],
        maxlength: [30, "Last name too long."],
        trim: true
    },
}, { versionKey: false, timestamps: true });

// 3. Model
export const AuthorModel = model<IAuthorModel>("AuthorModel", AuthorSchema, "authors");
