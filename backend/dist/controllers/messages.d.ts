import { Request, Response, NextFunction } from 'express';
declare const sendMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getChat: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getAllChats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { sendMessage, getChat, getAllChats, };
