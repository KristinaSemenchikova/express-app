import { Router } from 'express';
import { validateUser } from '../../validators/user';
import userService from '../../services/users';
import { NotFoundError } from '../../utils/customErrors/notFound';

const router = Router();

router.get('/', async (req, res, next) => {
  const { limit, page } = req.query;
  console.log(limit, page);
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

router.post('/', validateUser, async (req, res, next) => {
  const { body } = req;
  try {
    const user = await userService.add(body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getById(id);
    if (!user) throw new NotFoundError('User not found');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateUser, async (req, res, next) => {
  const { body, params: { id } } = req;
  try {
    const user = await userService.update(body, id);
    if (!user) throw new NotFoundError('User not found');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await userService.remove(id);
    if (!deleted) throw new NotFoundError('User not found');
    res.send('OK');
  } catch (error) {
    next(error);
  }
});

export { router as users };
