import { Router } from 'express';
import { NotFoundError } from '../../utils/customErrors';
import { authMiddleware } from '../../middlewares/auth';
import userService from '../../services/v2/users';
import { validateUpdateUser } from '../../validators/user';

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

router.put('/', [authMiddleware, validateUpdateUser], async (req, res, next) => {
  try {
    await userService.update(req.userId, req.body);
    const user = await userService.getById(req.userId);
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
