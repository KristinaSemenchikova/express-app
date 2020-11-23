import { Router } from 'express';
import { validateAuth } from '../../validators/auth';
import userService from '../../services/users';
import { validatePassword, getToken } from '../../utils/global';
import authService from '../../services/auth';
import { authMiddleware } from '../../utils/middlewares/auth';
import { NotFoundError } from '../../utils/customErrors';

const router = Router();

router.post('/login', validateAuth, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getOne({ email });
    if (!user) throw new NotFoundError('Wrong credentials');

    await validatePassword(password, user.password);

    const accessToken = await getToken({ email });

    await authService.addAuthUser({ token: accessToken, userId: user.id });

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    await authService.removeAuthUser(req.userId);
    res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
});

export { router as auth };
