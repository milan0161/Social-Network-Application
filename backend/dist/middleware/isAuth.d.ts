import { NextFunction, Request, Response } from 'express';
declare module 'express-serve-static-core' {
    interface Request {
        userId: string;
    }
}
declare const isAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { isAuth };
