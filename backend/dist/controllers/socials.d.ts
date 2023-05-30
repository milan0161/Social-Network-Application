import { Request, Response, NextFunction } from 'express';
declare const followUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const unfollowUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { followUser, unfollowUser };
