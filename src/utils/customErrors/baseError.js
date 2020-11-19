export class BaseError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.code = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
