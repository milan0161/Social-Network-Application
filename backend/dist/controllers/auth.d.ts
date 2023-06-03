import { Request, Response, NextFunction } from 'express';
declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const changePassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { register, login, changePassword };
