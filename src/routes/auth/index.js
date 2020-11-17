import { Router } from 'express';
import { validateAuth } from '../../validators/auth';

const router = Router();

router.post('/', validateAuth, async (req, res, next) => {
  try {
    res.send('Successfully auth');
  } catch (error) {
    next(error);
  }
});

export { router as auth };
