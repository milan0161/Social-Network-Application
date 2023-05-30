import { Request, Response, NextFunction } from 'express';
declare const createPost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getPosts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getNewFeeds: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createPost, getPosts, getNewFeeds };
