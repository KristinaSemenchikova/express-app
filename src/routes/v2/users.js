import { Router } from 'express';
import { validateUser } from '@validators/user';
import { NotFoundError } from '@utils/customErrors';
import { authMiddleware } from '@middlewares/auth';
import userService from '../../services/v2/users';

const router = Router();

router.get('/', authMiddleware, async (req, res, next) => {
  const { limit, page } = req.query;
  try {
    if (limit || page) {
      const paginated = await userService.getPaginatedUsers(limit, page);
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

router.put('/', [authMiddleware, validateUser], async (req, res, next) => {
  try {
    const user = await userService.update(req.userId, req.body);
    if (!user) throw new NotFoundError('User not found');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    await userService.delete(id);
    res.send('OK');
  } catch (error) {
    next(error);
  }
});

export { router as users };
