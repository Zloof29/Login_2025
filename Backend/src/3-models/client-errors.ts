import { StatusCode } from "./enums";

abstract class ClientError {
  public message: string;
  public status: number;

  public constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}

export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(`Route ${route} not found.`, StatusCode.NotFound);
  }
}

export class ResourceNotFoundError extends ClientError {
  public constructor(_id: string) {
    super(`_id ${_id} not exist.`, StatusCode.NotFound);
  }
}

export class ValidationError extends ClientError {
  public constructor(message: string) {
    super(message, StatusCode.BadRequest);
  }
}

export class UnauthorizedError extends ClientError {
  public constructor(message: string) {
    super(message, StatusCode.Unauthorized);
  }
}
