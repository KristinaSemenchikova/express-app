import { Router } from 'express';
import { auth } from './auth';
import { users } from './users';
import { posts } from './posts';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);

export { router };
