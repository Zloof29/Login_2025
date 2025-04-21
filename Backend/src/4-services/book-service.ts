import { BookModel, IBookModel } from "../3-models/user-model";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";

class BookService {
  public getAllBooks() {
    // Get all books without any virtual field:
    // return BookModel.find().exec();

    // Get all books with "author" virtual field:
    return BookModel.find().populate("author").exec();
  }

  public async getOneBook(_id: string) {
    const book = await BookModel.findById(_id).exec();
    if (!book) throw new ResourceNotFoundError(_id);
    return book;
  }

  public addBook(book: IBookModel) {
    const error = book.validateSync(); // If no error - returns null.
    if (error) throw new ValidationError(error.message);
    return book.save();
  }

  public async updateBook(book: IBookModel) {
    const error = book.validateSync(); // If no error - returns null.
    if (error) throw new ValidationError(error.message);
    const updatedBook = await BookModel.findByIdAndUpdate(book._id, book, {
      returnOriginal: false,
    }).exec(); // returnOriginal: false --> Return the updated book and not the original one
    if (!updatedBook) throw new ResourceNotFoundError(book._id.toString());
    return updatedBook;
  }

  public async deleteBook(_id: string) {
    const deletedBook = await BookModel.findByIdAndDelete(_id).exec();
    if (!deletedBook) throw new ResourceNotFoundError(_id);
  }

  // Mongo Query Language (MQL)
  public getSomeBooks() {
    // SELECT * FROM books WHERE price = 10
    // return BookModel.find({ price: 10 }).exec();

    // SELECT * FROM books WHERE price >= 10 AND price <= 20
    // return BookModel.find({ price: { $gte: 10, $lte: 20 } }).exec();

    // SELECT _id, name, price FROM books WHERE price >= 10 AND price <= 20
    // return BookModel.find({ price: { $gte: 10, $lte: 20 } }, ["name", "price"]).exec();

    // SELECT name, price FROM books WHERE price >= 10 AND price <= 20
    // return BookModel.find({ price: { $gte: 10, $lte: 20 } }, ["-_id", "name", "price"]).exec();

    // SELECT name, price FROM books WHERE price >= 10 AND price <= 20 ORDER BY price ASC
    // return BookModel.find({ price: { $gte: 10, $lte: 20 } }, ["-_id", "name", "price"], { sort: "price" }).exec();

    // SELECT name, price FROM books WHERE price >= 10 AND price <= 20 ORDER BY price DESC
    // return BookModel.find({ price: { $gte: 10, $lte: 20 } }, ["-_id", "name", "price"], { sort: "-price" }).exec();

    // SELECT name, price, pages FROM books WHERE price >= 10 AND pages < 100 ORDER BY price LIMIT 5 OFFSET 2
    // return BookModel.find(
    //     { price: { $gte: 10 }, pages: { $lt: 100 } }, // Filter = WHERE
    //     ["-_id", "name", "price", "pages"], // Projection = SELECT
    //     { sort: "price", limit: 5, skip: 2 }) // Options = ORDER BY...
    //     .exec();

    // SELECT name, price FROM books WHERE price = 10 OR pages < 100
    return BookModel.find(
      { $or: [{ price: 10 }, { pages: { $lt: 100 } }] }, // Filter = WHERE
      ["-_id", "name", "price"]
    ) // Projection = SELECT
      .exec();
  }
}

export const bookService = new BookService();
