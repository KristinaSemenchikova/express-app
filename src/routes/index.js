import { Router } from 'express';
import { auth } from './v2/auth';
import { users } from './v2/users';
import { posts } from './v2/posts';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);

export { router };
