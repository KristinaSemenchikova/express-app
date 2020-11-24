import express from 'express';
import helmet from 'helmet';
import * as routes from './routes';
import { errorHandler } from './utils/middlewares/errorHandler';
import { requestLogger } from './utils/middlewares/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.use('/users', routes.users);
app.use('/auth', routes.auth);

app.use(errorHandler);

process.on('unhandledRejection', async (reason) => {
  throw reason;
});

process.on('uncaughtException', async (error) => {
  await errorHandler(error);
});

export default app;
