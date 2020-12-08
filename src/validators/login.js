import Joi from 'joi';
import { PASSWORD_REGEXP } from '@constants/validation';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),
});

export const validateLogin = async (req, res, next) => {
  try {
    const { body } = req;
    await loginSchema.validateAsync(body);
    next();
  } catch (error) {
    next(error);
  }
};
