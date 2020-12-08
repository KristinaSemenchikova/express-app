import { Router } from 'express';
import { authMiddleware } from '@middlewares/auth';
import { NotFoundError } from '@utils/customErrors';
import { validateAuth } from '@validators/auth';
import { validatePassword, getToken, refreshToken } from '@utils/global';
import authService from '@services/auth';
import passport from '../../passportWithStrategy';

const router = Router();

router.post('/signup', validateAuth, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const authInfo = await authService.signUp(email, password);
    res.json(authInfo);
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateAuth, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authService.getByEmail(email);

    if (!user) throw new NotFoundError('Wrong credentials');

    await validatePassword(password, user.password);

    const accessToken = await getToken({ email, id: user.id });

    res.set('X-Token', accessToken).send('OK');
  } catch (error) {
    next(error);
  }
});

router.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', authMiddleware, async (req, res, next) => {
  try {
    const newToken = refreshToken(req.token);
    res.set('X-Token', newToken).send('OK');
  } catch (error) {
    next(error);
  }
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    res.redirect('/');
  });

export { router as auth };
