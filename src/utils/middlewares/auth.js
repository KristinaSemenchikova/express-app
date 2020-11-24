import { UnauthorizedError } from '../customErrors';
import { verifyToken } from '../global';
import authService from '../../services/auth';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (req.isAuthenticated()) return next();

    if (!authHeader) throw new UnauthorizedError('Missing auth header');

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') throw new UnauthorizedError('Wrong auth header');

    verifyToken(token);
    const user = await authService.getAuthUser(token);
    if (!user) throw new UnauthorizedError('You are not authorized');
    req.userId = user.userId;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
