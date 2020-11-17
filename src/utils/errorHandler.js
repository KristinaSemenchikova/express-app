/* eslint-disable no-unused-vars */
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../contants/statusCodes';
import { errorLogger } from './logger';

export const errorHandler = async (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') await errorLogger(error);

  if (error.name === 'ValidationError') {
    return res.status(error.code || BAD_REQUEST).json(error.details);
  }
  if (error.name === 'NotFoundError') {
    return res.status(error.code || NOT_FOUND).json(error.message);
  }
  return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
};
