import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { body } from 'express-validator';
import { isAuth } from '../middleware/isAuth';
import { validationMiddleware } from '../middleware/validation-middleware';

const router = Router();

router.post(
  '/register',
  [
    body('firstname')
      .isString()
      .isLength({ min: 2, max: 25 })
      .trim()
      .withMessage('Please enter a valid name, min 2 - max 25 characters'),
    body('lastname')
      .isString()
      .isLength({ min: 3, max: 25 })
      .withMessage('Please enter a valid lastname, min 3 - max 25 characters')
      .trim(),
    body('email').not().isEmpty().isEmail().withMessage('Please enter a valid email adress').trim(),
    body('password').not().isEmpty().isString().isLength({ min: 5, max: 30 }).trim(),
  ],
  validationMiddleware,
  register,
);
router.post(
  '/login',
  [body('email').isEmail().trim().withMessage('Please enter a valid email adress')],
  validationMiddleware,
  login,
);

export default router;
