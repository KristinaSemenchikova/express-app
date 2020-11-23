import winston from 'winston';
import path from 'path';

const logDirname = path.join(path.resolve(), 'logs');

export const createLogger = (level, filename) => {
  const transports = [
    new winston.transports.File({ filename, dirname: logDirname }),
  ];
  if (process.env !== 'production') {
    transports.push(new winston.transports.Console({ format: winston.format.json() }));
  }
  return winston.createLogger({
    level,
    format: winston.format.json(),
    transports,
  });
};

const requestLog = createLogger('info', 'request.log');

export const requestLogger = (req, res, next) => {
  const timestamp = new Date();
  requestLog.info({
    timestamp,
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

const errorLog = createLogger('error', 'error.log');

export const errorLogger = async (err) => {
  const { message, name } = err;
  const timestamp = new Date();
  errorLog.error(`${timestamp} ${name}: ${message}`);
};
