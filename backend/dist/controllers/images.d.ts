import { Request, Response, NextFunction } from 'express';
declare const setProfilePicture: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getPictures: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProfilePicture: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { setProfilePicture, getPictures, getProfilePicture };
