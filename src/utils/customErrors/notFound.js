import { NOT_FOUND } from '../../constants/statusCodes';
import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  constructor(message, statusCode = NOT_FOUND) {
    super('NotFoundError', message, statusCode);
  }
}
