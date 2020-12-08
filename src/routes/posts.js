import { Router } from 'express';
import { authMiddleware } from '@middlewares/auth';
import { validatePost } from '../validators/post';
import postService from '../services/posts';
import userService from '../services/users';

const router = Router();

router.post('/', [authMiddleware, validatePost], async (req, res, next) => {
  const { body } = req;
  const { userId } = req;
  try {
    const post = await postService.addPost(body, userId);
    await userService.update(userId,
      {
        $push: {
          posts: post,
        },
      });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  const { search = '' } = req.query;
  try {
    let posts = [];
    if (search) {
      posts = await postService.search(search);
    } else {
      posts = await postService.getAll();
    }
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

export { router as posts };
