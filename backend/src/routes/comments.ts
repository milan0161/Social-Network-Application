import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';
import { validationMiddleware } from '../middleware/validation-middleware';
import { body } from 'express-validator';
import { createComment, editComment } from '../controllers/comments';

const router = Router();

router.post(
  '/create-comment/:postId',
  [body('content', 'Content must be provided').isString().not().isEmpty()],
  isAuth,
  validationMiddleware,
  createComment,
);
router.patch(
  '/edit-comment/:id',
  [body('content', 'Content must be provided').isString().not().isEmpty()],
  isAuth,
  validationMiddleware,
  editComment,
);

export default router;
