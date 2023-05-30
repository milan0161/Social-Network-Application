import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/socials';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.post('/follow-user/:id', isAuth, followUser);
router.post('/unfollow-user/:id', isAuth, unfollowUser);

export default router;
