import { Request, Response, NextFunction } from 'express';
import UnauthenticatedError from '../errors/unauthenticated';
import { PrismaClient } from '@prisma/client';
require('dotenv').config();
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { signAtoken, signRToken } from '../utils/jwt';

const prisma = new PrismaClient();

interface DecodedToken {
  id: string;
  iat: string;
  exp: string;
}

const refreshTokens = async (req: Request, res: Response, next: NextFunction) => {
  const { rToken } = req.body as { rToken: string };
  try {
    if (!rToken) {
      throw new UnauthenticatedError('You are not authorized for this action, please login to continue');
    }
    const secret = process.env.REFRESH_TOKEN_SECRET;

    const decodedToken = jwt.verify(rToken, secret!);
    if (typeof decodedToken === 'string') {
      throw new UnauthenticatedError('Invalid Token');
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mainImage: true,
        allImages: true,
      },
    });
    const aToken = signAtoken({
      firstname: user!.firstname,
      lastname: user!.lastname,
      email: user!.email,
      id: user!.id,
    });
    const newRToken = signRToken(user!.id);

    res.status(StatusCodes.OK).json({ aToken: aToken, rToken: newRToken });
  } catch (error) {
    next(error);
  }
};

export { refreshTokens };
