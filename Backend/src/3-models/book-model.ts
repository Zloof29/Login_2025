import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { AuthorModel } from "./author-model";

// 1. Interface describing our model:
export interface IBookModel extends Document { // Document = a single object in a JSON collection.
    // We have _id from the Document
    name: string;
    price: number;
    pages: number;
    authorId: ObjectId;
}

// 2. Schema describing more data, validation and more:
export const BookSchema = new Schema<IBookModel>({
    name: {
        type: String,
        required: [true, "Missing name."],
        maxlength: [50, "Name too long."],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price can't be negative."],
        max: [1000, "Price can't exceed 1000."]
    },
    pages: {
        type: Number,
        required: [true, "Missing pages."],
        min: [1, "Pages must be minimum 1."],
        max: [1000, "Pages can't exceed 1000."]
    },
    authorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Missing author id"]
    }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true }, // Fill virtual fields.
    id: false // Don't duplicate _id to id.
});

// Virtual field - שדה שלא באמת קיים באוסף, אלא נבנה בזמן החזרת המידע
BookSchema.virtual("author", {
    ref: AuthorModel, // Which other model we're connecting to.
    localField: "authorId", // In our model (BookModel) which field name belongs to the relation.
    foreignField: "_id", // In the other model (AuthorModel) which field name belongs to the relation.
    justOne: true // author is an single object and not an array.
});

// 3. Creating the model:
export const BookModel = model<IBookModel>("BookModel", BookSchema, "books"); // model name, schema, collection name
