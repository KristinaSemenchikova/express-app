/* eslint-disable no-unused-vars */
import { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } from '../contants/statusCodes';
import { errorLogger } from './logger';

export const errorHandler = async (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') await errorLogger(error);

  if (error.name === 'ValidationError') {
    return res.status(error.code || BAD_REQUEST).json(error.details || { message: error.message });
  }
  if (error.name === 'NotFoundError') {
    return res.status(error.code || NOT_FOUND).json({ message: error.message });
  }
  return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
};
