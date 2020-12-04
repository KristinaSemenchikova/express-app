import { BAD_REQUEST } from '../../constants/statusCodes';
import { BaseError } from './baseError';

export class ValidationError extends BaseError {
  constructor(message, statusCode = BAD_REQUEST) {
    super('ValidationError', message, statusCode);
  }
}
