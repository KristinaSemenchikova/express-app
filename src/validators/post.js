import Joi from 'joi';

const postSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string().required(),
});

export const validatePost = async (req, res, next) => {
  try {
    const { body } = req;
    await postSchema.validateAsync(body);
    next();
  } catch (error) {
    next(error);
  }
};
