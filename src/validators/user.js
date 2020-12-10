import Joi from 'joi';
import {
  PHONE_REGEXP, SEXES, PASSWORD_REGEXP,
} from '@constants/validation';

const validateSex = (value, helper) => {
  if (!SEXES.includes(value)) {
    return helper.message(`Sex must be ${SEXES.join(' or ')}`);
  }
  return true;
};

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().regex(PHONE_REGEXP),
  sex: Joi.string().custom(validateSex).required(),
});

export const validateUser = async (req, res, next) => {
  try {
    const { body } = req;
    await userSchema.validateAsync(body);
    next();
  } catch (error) {
    next(error);
  }
};
