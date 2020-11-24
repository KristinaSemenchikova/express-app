import winston from 'winston';
import path from 'path';

const logDirname = path.join(path.resolve(), 'logs');

export const createLogger = () => {
  const transports = [
    new winston.transports.File({ filename: 'error.log', dirname: logDirname, level: 'error' }),
    new winston.transports.File({ filename: 'request.log', dirname: logDirname, level: 'info' }),
  ];
  if (process.env !== 'production') {
    transports.push(new winston.transports.Console({ format: winston.format.json() }));
  }
  return winston.createLogger({
    format: winston.format.json(),
    transports,
    level: 'info',
  });
};

const logger = createLogger();

export const requestLogger = (req, res, next) => {
  logger.info({
    timestamp: new Date(),
    method: req.method,
    payload: {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    },
  });
  next();
};

export const errorLogger = async (err) => {
  const { message, name } = err;
  const timestamp = new Date();
  logger.error(`${timestamp} ${name}: ${message}`);
};
