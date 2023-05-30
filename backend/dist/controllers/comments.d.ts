import { Request, Response, NextFunction } from 'express';
declare const createComment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const editComment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createComment, editComment };
