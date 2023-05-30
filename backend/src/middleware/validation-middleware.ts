import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import BadRequestError from '../errors/bad-request';

const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.array().length === 0) {
    return next();
  }

  throw new BadRequestError(errors.array()[0].msg);
};

export { validationMiddleware };
