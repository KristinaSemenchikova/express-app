export class NotFoundError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NotFoundError';
    this.code = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
