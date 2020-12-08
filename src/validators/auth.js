import Joi from 'joi';
import { PASSWORD_REGEXP } from '@constants/validation';

const creds = {
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),
};

const credsSchema = Joi.object(creds);

const authSchema = Joi.object({
  ...creds,
  name: Joi.string().required(),
});

export const validateAuth = async (req, res, next) => {
  try {
    const { body } = req;
    await authSchema.validateAsync(body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateLogin = async (req, res, next) => {
  try {
    const { body } = req;
    await credsSchema.validateAsync(body);
    next();
  } catch (error) {
    next(error);
  }
};
