import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found';

const prisma = new PrismaClient();

const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const postId = req.params.postId;
  const { content } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: userId,
        postId: postId,
        content: content,
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
        postId: true,
      },
    });
    res.status(StatusCodes.CREATED).json({ comment: comment });
  } catch (error) {
    next(error);
  }
};

const editComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.id;
  const { content } = req.body;

  try {
    const comment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
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
        postId: true,
      },
    });
    if (!comment) {
      throw new NotFoundError(`Comment can't be found`);
    }
    res.status(StatusCodes.OK).json({ comment: comment });
  } catch (error) {
    next(error);
  }
};

export { createComment, editComment };
