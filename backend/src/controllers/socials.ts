import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request';

const prisma = new PrismaClient();

const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.userId;
  const usertoFollowId = req.params.id;

  try {
    const userToFollow = await prisma.user.findUnique({
      where: {
        id: usertoFollowId,
      },
      select: {
        firstname: true,
        lastname: true,
        followedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    const isFollow = userToFollow?.followedBy.find((id) => id.id === userId);
    if (isFollow) {
      throw new BadRequestError(`You already follow ${userToFollow?.firstname} ${userToFollow?.lastname}`);
    }
    await prisma.user.update({
      where: {
        id: usertoFollowId,
      },
      data: {
        followedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: `You have successfully followed a user ${userToFollow?.firstname} ${userToFollow?.lastname}` });
  } catch (error) {
    next(error);
  }
};

const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const userToUnfollowId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userToUnfollowId,
      },
      select: {
        firstname: true,
        lastname: true,
        followedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    const isFollow = user?.followedBy.find((id) => userId);
    if (!isFollow) {
      throw new BadRequestError(`Unable to unfollow, you are not following ${user?.firstname} ${user?.lastname}`);
    }
    await prisma.user.update({
      where: {
        id: userToUnfollowId,
      },
      data: {
        followedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: `You have successfully unfollowed a user ${user?.firstname} ${user?.lastname}` });
  } catch (error) {
    next(error);
  }
};

export { followUser, unfollowUser };
