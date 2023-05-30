import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { SysFile } from './types';
import BadRequestError from '../errors/bad-request';
import NotFoundError from '../errors/not-found';
import { StatusCodes } from 'http-status-codes';
const prisma = new PrismaClient();

const setProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const newMainImage = req.params.imageId;
  try {
    const image = await prisma.image.findUnique({
      where: {
        id: newMainImage,
      },
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        mainImage: image?.path,
      },
    });

    res.status(StatusCodes.OK).json({ message: 'You have successfully changed your profile picture' });
  } catch (error) {
    next(error);
  }
};

const getPictures = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  try {
    const pictures = await prisma.image.findMany({
      where: {
        authorId: userId,
      },
      select: {
        authorId: true,
        id: true,
        path: true,
        post: {
          select: {
            content: true,
          },
        },
      },
    });
    if (!pictures) {
      throw new NotFoundError('You do not have any picture yet, please upload');
    }
    if (pictures.length === 0) {
      throw new NotFoundError('You do not have any picture yet, please upload');
    }
    res.status(StatusCodes.OK).json({ allImages: pictures });
  } catch (error) {
    next(error);
  }
};

const getProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        mainImage: true,
      },
    });
    if (!user?.mainImage) {
      throw new NotFoundError(`You don't have a profile picture set yet`);
    }
    res.status(StatusCodes.OK).json({ profilePicture: user.mainImage });
  } catch (error) {
    next(error);
  }
};

export { setProfilePicture, getPictures, getProfilePicture };
