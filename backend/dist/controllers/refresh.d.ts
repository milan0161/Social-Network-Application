import { Request, Response, NextFunction } from 'express';
declare const refreshTokens: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { refreshTokens };
