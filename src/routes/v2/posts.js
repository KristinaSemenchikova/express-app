import { Router } from 'express';
import { authMiddleware } from '@middlewares/auth';
import { validatePost } from '../../validators/post';
import postService from '../../services/v2/posts';
import userService from '../../services/v2/users';

const router = Router();

router.post('/', [authMiddleware, validatePost], async (req, res, next) => {
  const { body } = req;
  const { userId } = req;
  try {
    const post = await postService.addPost(body, userId);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    // let posts = [];
    // if (search) {
    //   posts = await postService.search(search);
    // } else {
    //   posts = await postService.getAll();
    // }
    const posts = await postService.getAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  const postId = req.params.id;
  try {
    await postService.delete(postId);
    await userService.update(req.userId,
      { $pull: { posts: postId } });
    res.json({ message: 'Post was deleted' });
  } catch (error) {
    next(error);
  }
});

export { router as posts };
