import { NextFunction, Request, Response } from 'express';
import UnauthenticatedError from '../errors/unauthenticated';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import { p } from '../utils/jwt';
import ForbiddenError from '../errors/forbidden-error';
const PUB_KEY = fs.readFileSync(p + '/pub_key.pem', 'utf8');

declare module 'express-serve-static-core' {
  interface Request {
    userId: string;
  }
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new ForbiddenError('Not Authorized');
    }

    if (authHeader.split(' ')[0] !== 'Bearer') {
      throw new ForbiddenError('Not Authorized');
    }
    jwt.verify(authHeader.split(' ')[1], PUB_KEY, { algorithms: ['RS256'] }, (error, payload: any) => {
      if (error) {
        throw new ForbiddenError(error.message);
      }
      req.userId = payload.id;
    });

    next();
  } catch (error) {
    next(error);
  }
};

export { isAuth };
