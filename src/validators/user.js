import Joi from 'joi';
import JoiPhoneNumber from 'joi-phone-number';

const extendedJoi = Joi.extend(JoiPhoneNumber);

const validateSex = (value, helper) => {
  const sex = ['male', 'female'];
  if (!sex.includes(value)) {
    return helper.message(`Sex must be one of ${sex.join(' ')}`);
  }
  return true;
};

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: extendedJoi.string().phoneNumber(),
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
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
