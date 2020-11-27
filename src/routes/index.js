import { Router } from 'express';
import { auth } from './auth';
import { users } from './users';

const router = Router();

router.use('/users', users);
router.use('/auth', auth);

export { router };
