import { Router } from 'express';
import {
  addInformations,
  getAllUnfollowed,
  getAllUsers,
  getFollowers,
  getFollowing,
  getSingleUser,
  getUserInformations,
  updateInformations,
} from '../controllers/user';
import { body, check } from 'express-validator';
import { isAuth } from '../middleware/isAuth';
import { validationMiddleware } from '../middleware/validation-middleware';
import { setProfilePicture, getProfilePicture } from '../controllers/images';

const router = Router();

router.post(
  '/add-informations',
  [
    check('age', 'Age must be at least 18.').optional({ checkFalsy: false, nullable: true }).isInt({ min: 18 }),
    check('city', 'Enter a valid City Name')
      .optional({ checkFalsy: false, nullable: true })
      .isString()
      .isLength({ min: 1, max: 50 }),
    check('phoneNumber', 'Please enter a valid phone number')
      .optional({ checkFalsy: false, nullable: true })
      .isInt()
      .isLength({ min: 6, max: 20 }),
    check('employed', 'Check true or False').optional({ checkFalsy: false, nullable: true }).isBoolean(),
    check('workPlace', 'Enter a valid work place')
      .optional({ checkFalsy: false, nullable: true })
      .isString()
      .isLength({ min: 3, max: 50 }),
  ],
  isAuth,
  validationMiddleware,
  addInformations,
);
router.patch(
  '/update-informations',
  [
    check('age', 'Age must be at least 18.').optional({ checkFalsy: false, nullable: true }).isInt({ min: 18 }),
    check('city', 'Enter a valid City Name')
      .optional({ checkFalsy: false, nullable: true })
      .isString()
      .isLength({ min: 1, max: 50 }),
    check('phoneNumber', 'Please enter a valid phone number')
      .optional({ checkFalsy: false, nullable: true })
      .isInt()
      .isLength({ min: 6, max: 20 }),
    check('employed', 'Check true or False').optional({ checkFalsy: false, nullable: true }).isBoolean(),
    check('workPlace', 'Enter a valid work place')
      .optional({ checkFalsy: false, nullable: true })
      .isString()
      .isLength({ min: 3, max: 50 }),
  ],
  isAuth,
  validationMiddleware,
  updateInformations,
);
router.get('/get-user-info/:id', isAuth, getUserInformations);
router.post('/set-profile-picture/:imageId', isAuth, setProfilePicture);
router.get('/get-profile-picture', isAuth, getProfilePicture);
router.get('/single-user/:id', isAuth, getSingleUser);
router.get('/get-all', isAuth, getAllUnfollowed);
router.get('/get-all-users', isAuth, getAllUsers);
router.get('/get-followers/:id', isAuth, getFollowers);
router.get('/get-following/:id', isAuth, getFollowing);

export default router;
