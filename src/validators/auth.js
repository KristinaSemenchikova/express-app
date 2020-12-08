import Joi from 'joi';
import { PASSWORD_REGEXP } from '@constants/validation';

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),
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
