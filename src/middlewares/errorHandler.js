/* eslint-disable no-unused-vars */
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, BAD_REQUEST } from '@constants/statusCodes';
import { errorLogger } from './logger';

const getStatusCode = (errorName) => {
  switch (errorName) {
    case 'TokenExpiredError':
    case 'JsonWebTokenError':
    case 'NotBeforeError':
    case 'UnauthorizedError':
      return UNAUTHORIZED;
    case 'MongoError':
      return BAD_REQUEST;
    default:
      return INTERNAL_SERVER_ERROR;
  }
};
export const errorHandler = async (error, req, res, next) => {
  console.log(error);
  if (process.env.NODE_ENV !== 'test') await errorLogger(error);
  if (error.name !== 'Error') {
    res.status(error.code < 599 ? error.code : getStatusCode(error.name));
    return res.json(error.details || { message: error.message });
  }
  return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
};
