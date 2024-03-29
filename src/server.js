import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import { errorHandler } from '@middlewares/errorHandler';
import { requestLogger } from '@middlewares/logger';
import { router } from './routes';
import passport from './passportWithStrategy';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(requestLogger);

app.use('/api', router);

app.use(errorHandler);

process.on('unhandledRejection', async (reason) => {
  throw reason;
});

process.on('uncaughtException', async (error) => {
  await errorHandler(error);
});

export default app;
