import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UnauthenticatedError from '../errors/unauthenticated';
import BadRequestError from '../errors/bad-request';
import NotFoundError from '../errors/not-found';
import CustomApiError from '../errors/custom-error';
import ForbiddenError from '../errors/forbidden-error';
const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof UnauthenticatedError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof BadRequestError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof ForbiddenError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    // 'Something went wront, please try again later'
  });
};
export default errorHandlerMiddleware;
