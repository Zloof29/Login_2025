import express, { NextFunction, Request, Response } from "express";
import { bookService } from "../4-services/user-service";
import { BookModel } from "../3-models/user-model";
import { StatusCode } from "../3-models/enums";

class BookController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/books", this.getAllBooks);
    this.router.get("/books/:_id", this.getOneBook);
    this.router.post("/books", this.addBook);
    this.router.put("/books/:_id", this.updateBook);
    this.router.delete("/books/:_id", this.deleteBook);
    this.router.get("/search-books", this.getSomeBooks);
  }

  private async getAllBooks(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const books = await bookService.getAllBooks();
      response.json(books);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneBook(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const book = await bookService.getOneBook(_id);
      response.json(book);
    } catch (err: any) {
      next(err);
    }
  }

  private async addBook(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const book = new BookModel(request.body);
      const addedBook = await bookService.addBook(book);
      response.status(StatusCode.Created).json(addedBook);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateBook(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      request.body._id = _id;
      const book = new BookModel(request.body);
      const updatedBook = await bookService.updateBook(book);
      response.json(updatedBook);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteBook(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await bookService.deleteBook(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }

  private async getSomeBooks(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const books = await bookService.getSomeBooks();
      response.json(books);
    } catch (err: any) {
      next(err);
    }
  }
}

const bookController = new BookController();
export const bookRouter = bookController.router;
