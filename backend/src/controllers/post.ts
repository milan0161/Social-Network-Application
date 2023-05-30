import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { Images, Post, SysFile } from './types';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request';
import NotFoundError from '../errors/not-found';

const prisma = new PrismaClient();

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const { content } = <Post>req.body;

  try {
    if (!req.files) {
      throw new BadRequestError('Please select at least one image');
    }
    if (req.files.length === 0) {
      throw new BadRequestError('Please select at least one image');
    }
    let images: any = req.files;

    const cnt = images.length;

    images?.forEach((image: SysFile) => {
      images.push(image.path.replaceAll('\\', '/'));
    });
    images = images.slice(cnt);

    let obj: Images[] = [];
    images.forEach((img: any) => {
      const o = {
        authorId: userId,
        path: img,
      };
      obj.push(o);
    });
    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content: content,
        image: {
          createMany: {
            data: obj,
          },
        },
      },
      select: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            mainImage: true,
          },
        },
        content: true,
        image: true,
      },
    });

    res.status(StatusCodes.CREATED).json({ post: post });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            mainImage: true,
          },
        },
        image: {
          select: {
            path: true,
          },
        },
        comments: {
          select: {
            id: true,
            author: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                mainImage: true,
              },
            },
            content: true,
          },
        },
      },
    });
    if (posts.length === 0) {
      // res.status(StatusCodes.NO_CONTENT).json({ message: 'User does not have any post yet' });
      throw new NotFoundError('User does not have any post yet');
    }
    res.status(StatusCodes.OK).json({ posts: posts });
  } catch (error) {
    next(error);
  }
};

const getNewFeeds = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const page: number = Number(req.query.page) || 1;
  const take = Number(req.query.limit) || 3;
  const skip: number = (page - 1) * take;
  try {
    const user = await prisma.user.findUnique({
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
    if (user?.following.length === 0) {
      throw new NotFoundError('You are currently not following anyone, follow someone to get new feeds');
    }
    const posts = await prisma.post.findMany({
      skip: skip,
      take: take,
      where: {
        authorId: {
          in: user?.following.map((user) => user.id),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        image: {
          select: {
            id: true,
            path: true,
          },
        },
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            mainImage: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            content: true,
            author: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                mainImage: true,
              },
            },
          },
        },
      },
    });
    res.status(StatusCodes.OK).json({ posts: posts });
  } catch (error) {
    next(error);
  }
};

export { createPost, getPosts, getNewFeeds };
