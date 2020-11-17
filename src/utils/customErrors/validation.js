export class ValidationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ValidationError';
    this.code = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
