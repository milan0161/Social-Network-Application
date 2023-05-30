import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';
import {
  getAllChats,
  getChat,
  //  getTableChat,
  sendMessage,
} from '../controllers/messages';

const router = Router();

router.post('/send/:id', isAuth, sendMessage);
router.get('/chat/:id', isAuth, getChat);
router.get('/get-all-chats', isAuth, getAllChats);
// router.get('/get-table-chats', isAuth, getTableChat);

export default router;
