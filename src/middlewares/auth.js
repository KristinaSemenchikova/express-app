import { UnauthorizedError } from '@utils/customErrors';
import { verifyToken } from '@utils/global';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (req.isAuthenticated()) return next();

    if (!authHeader) throw new UnauthorizedError('Missing auth header');

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') throw new UnauthorizedError('Wrong auth header');

    const { userId } = verifyToken(token);
    req.userId = userId;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
