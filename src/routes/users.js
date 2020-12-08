import { Router } from 'express';
import { validateUser } from '@validators/user';
import userService from '@services/users';
import { NotFoundError } from '@utils/customErrors';
import { authMiddleware } from '@middlewares/auth';
import authService from '../services/auth';

const router = Router();

router.post('/', [authMiddleware, validateUser], async (req, res, next) => {
  const { body } = req;
  const { userId, authInfoId } = req;
  try {
    if (userId) throw new Error('User already exists');
    const user = await userService.add(body, authInfoId);
    await authService.addUser(authInfoId, user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  const { limit, page } = req.query;
  try {
    if (limit || page) {
      const paginated = await userService.getUsers(limit, page);
      return res.json(paginated);
    }
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getById(id);
    if (!user) throw new NotFoundError('User not found');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', [authMiddleware, validateUser], async (req, res, next) => {
  const { body, params: { id } } = req;
  try {
    const user = await userService.update(body, id);
    if (!user) throw new NotFoundError('User not found');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    await userService.remove(id);
    res.send('OK');
  } catch (error) {
    next(error);
  }
});

export { router as users };
