import { Information, PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found';
const prisma = new PrismaClient();

const addInformations = async (req: Request, res: Response, next: NextFunction) => {
  const { age, city, dateOfBirth, employed, phoneNumber, placeOfBirth, workPlace } = req.body as Information;
  const userId = req.userId;
  try {
    let date;
    if (dateOfBirth) {
      date = new Date(dateOfBirth);
    }
    const informations = await prisma.information.create({
      data: {
        age: age,
        city: city,
        employed: employed,
        phoneNumber: phoneNumber,
        dateOfBirth: date,
        placeOfBirth: placeOfBirth,
        workPlace: workPlace,
        userId: userId,
      },
    });
    res.status(StatusCodes.CREATED).json({ informations: informations });
  } catch (error) {
    next(error);
  }
};

const updateInformations = async (req: Request, res: Response, next: NextFunction) => {
  const { age, city, dateOfBirth, employed, phoneNumber, placeOfBirth, workPlace } = req.body as Information;
  const userId = req.userId;
  try {
    let date;
    if (dateOfBirth) {
      date = new Date(dateOfBirth);
    }

    const informations = await prisma.information.update({
      where: {
        userId: userId,
      },
      data: {
        age: age,
        city: city,
        employed: employed,
        phoneNumber: phoneNumber,
        dateOfBirth: date,
        placeOfBirth: placeOfBirth,
        workPlace: workPlace,
        userId: userId,
      },
    });
    res.status(StatusCodes.OK).json({ informations: informations });
  } catch (error) {
    next(error);
  }
};

const getUserInformations = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        information: true,
      },
    });
    if (!userInfo?.information) {
      throw new NotFoundError(`Currently no more info about this user.`);
    }
    res.status(StatusCodes.OK).json({ userInfo: userInfo.information });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mainImage: true,
        // information: true,
        // allImages: true,
        // following: true,
      },
    });
    if (!user) {
      throw new NotFoundError('Unable to find this user');
    }
    res.status(StatusCodes.OK).json({ user: user });
  } catch (error) {
    next(error);
  }
};

const getAllUnfollowed = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        following: {
          select: {
            id: true,
          },
        },
      },
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: {
            equals: userId,
            in: currentUser!.following.map((user) => user.id),
          },
        },
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mainImage: true,
        // following: {
        //   select: {
        //     id: true,
        //   },
        // },
      },
    });
    if (users.length === 0) {
      throw new NotFoundError('No more available Users');
    }
    res.status(StatusCodes.OK).json({ users: users });
  } catch (error) {
    next(error);
  }
};

const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
  // const userId = req.userId;
  const userId = req.params.id;
  try {
    const getFollowers = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followedBy: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            mainImage: true,
            followedBy: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    if (!getFollowers) {
      throw new NotFoundError('Something went wrong, please try again later');
    }
    if (getFollowers.followedBy.length === 0) {
      // res.status(StatusCodes.OK).json({ message: 'User does not have any follower yet' });
      throw new NotFoundError('You have no followers yet');
    }
    res.status(StatusCodes.OK).json({ followers: getFollowers.followedBy });
  } catch (error) {
    next(error);
  }
};

const getFollowing = async (req: Request, res: Response, next: NextFunction) => {
  // const userId = req.userId;
  const userId = req.params.id;
  try {
    const getFollowing = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            mainImage: true,
          },
        },
      },
    });
    if (!getFollowing) {
      throw new NotFoundError('Something went wrong, please try again later');
    }
    if (getFollowing.following.length === 0) {
      throw new NotFoundError('You do not follow anyone yet');
    }
    res.status(StatusCodes.OK).json({ following: getFollowing.following });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  let { search } = req.query as { search: string | undefined };
  if (typeof search === 'string' && search.length === 0) {
    search = undefined;
  }
  try {
    const allUsers = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        OR: {
          firstname: {
            startsWith: search,
            mode: 'insensitive',
          },
        },
      },
      orderBy: {
        firstname: 'asc',
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        mainImage: true,
      },
    });
    if (!allUsers) {
      throw new NotFoundError('Something went wrong, we could not find any user');
    }
    res.status(StatusCodes.OK).json({ users: allUsers });
  } catch (error) {
    next(error);
  }
};

export {
  addInformations,
  updateInformations,
  getSingleUser,
  getAllUnfollowed,
  getFollowers,
  getFollowing,
  getAllUsers,
  getUserInformations,
};
