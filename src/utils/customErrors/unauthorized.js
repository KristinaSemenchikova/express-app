import { UNAUTHORIZED } from '../../contants/statusCodes';
import { BaseError } from './baseError';

export class UnauthorizedError extends BaseError {
  constructor(message, statusCode = UNAUTHORIZED) {
    super('UnauthorizedError', message, statusCode);
  }
}
