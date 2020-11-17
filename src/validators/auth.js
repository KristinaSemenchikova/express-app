import Joi from 'joi';

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
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
