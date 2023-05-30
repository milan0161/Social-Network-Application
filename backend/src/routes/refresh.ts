import { Router } from 'express';
import { refreshTokens } from '../controllers/refresh';

const router = Router();

router.post('/refresh', refreshTokens);

export default router;
