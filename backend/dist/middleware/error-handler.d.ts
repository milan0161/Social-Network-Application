import { NextFunction, Request, Response } from 'express';
declare const errorHandlerMiddleware: (error: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorHandlerMiddleware;
