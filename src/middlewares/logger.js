import winston from 'winston';
import path from 'path';
import LogModel from '../models/logs';

const logDirname = path.join(path.resolve(), 'logs');

const customFormat = winston.format.combine(winston.format.colorize({ all: true }));

export const createLogger = () => {
  const transports = [
    new winston.transports.File({ filename: 'error.log', dirname: logDirname, level: 'error' }),
    new winston.transports.File({ filename: 'request.log', dirname: logDirname, level: 'info' }),
  ];
  if (process.env !== 'production') {
    transports.push(new winston.transports.Console({ format: customFormat }));
  }
  return winston.createLogger({
    transports,
    level: 'info',
  });
};

const logger = createLogger();

export const requestLogger = async (req, res, next) => {
  try {
    const log = {
      method: req.method,
      path: req.originalUrl,
      payload: {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      },
    };
    logger.info({
      timestamp: new Date(),
      ...log,
    });
    await LogModel.create(log);
    next();
  } catch (error) {
    next();
  }
};

export const errorLogger = async (err) => {
  const { message, name } = err;
  const timestamp = new Date();
  logger.error(`${timestamp} ${name}: ${message}`);
};
