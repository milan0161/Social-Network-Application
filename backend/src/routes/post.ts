import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';
import { validationMiddleware } from '../middleware/validation-middleware';
import { body } from 'express-validator';

import { createPost, getNewFeeds, getPosts } from '../controllers/post';

const router = Router();

router.post(
  '/create-post',
  [body('content', 'Content must be provided').isString().not().isEmpty()],
  isAuth,
  validationMiddleware,
  createPost,
);
router.get('/get-post/:userId', isAuth, getPosts);
router.get('/get-new-feeds', isAuth, getNewFeeds);

export default router;
