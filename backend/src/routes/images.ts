import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';

import { getPictures } from '../controllers/images';

const router = Router();

router.get('/get-user-photos/:id', isAuth, getPictures);

export default router;
