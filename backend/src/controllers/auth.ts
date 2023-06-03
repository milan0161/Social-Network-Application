import { Request, Response, NextFunction } from 'express';
import { ChangePassBody, Login, Register } from './types';
import { PrismaClient } from '@prisma/client';
import BadRequestError from '../errors/bad-request';
import { hashPassword, verifyPassword } from '../utils/passwords';
import { StatusCodes } from 'http-status-codes';
import { signAtoken, signRToken } from '../utils/jwt';
import NotFoundError from '../errors/not-found';
const prisma = new PrismaClient();

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password } = req.body as Register;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new BadRequestError('User with that email adress already exist');
    }
    const hashedPw = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPw,
        information: {
          create: {
            age: null,
            city: null,
            employed: null,
            phoneNumber: null,
            dateOfBirth: null,
            placeOfBirth: null,
            workPlace: null,
          },
        },
      },
    });
    res.status(StatusCodes.CREATED).json({ message: 'You have successfully registered, please log in to continue' });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as Login;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        information: true,
        mainImage: true,
        allImages: true,
      },
    });
    if (!user) {
      throw new NotFoundError('User with that email does not exist');
    }
    const comparePasswords = await verifyPassword(password, user.password);
    if (!comparePasswords) {
      throw new BadRequestError('Password is invalid');
    }
    const aToken = signAtoken({ firstname: user.firstname, lastname: user.lastname, email: user.email, id: user.id });
    const rToken = signRToken(user.id);
    user.password = '';
    res.status(StatusCodes.OK).json({ aToken, rToken, user: { ...user, password: undefined } });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const { newPassword, oldPassword } = req.body as ChangePassBody;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });
    if (!user) {
      throw new NotFoundError('Could not find user, something went wrong, please try agian later');
    }
    const isVerify = await verifyPassword(oldPassword, user.password);
    if (!isVerify) {
      throw new BadRequestError('Password is incorrect');
    }
    const hashedNewPw = await hashPassword(newPassword);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedNewPw,
      },
    });
    res.status(StatusCodes.OK).json({ message: 'Uspesno ste promenili password' });
  } catch (error) {
    next(error);
  }
};

export { register, login, changePassword };
