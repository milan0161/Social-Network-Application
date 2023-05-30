import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getIO } from '../utils/socket';
import NotFoundError from '../errors/not-found';
const prisma = new PrismaClient();

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  const senderId = req.userId;
  const recivierId = req.params.id;
  const { content } = req.body as { content: string };
  try {
    const findChat = await prisma.chat.findFirst({
      where: {
        users: {
          every: {
            id: { in: [senderId, recivierId] },
          },
        },
      },
    });
    if (findChat) {
      const newMessage = await prisma.message.create({
        data: {
          chatId: findChat.id,
          content: content,
          senderId: senderId,
          receiverId: recivierId,
        },
        select: {
          content: true,
          sender: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              mainImage: true,
            },
          },
          id: true,
        },
      });
      // const newMessage = await prisma.chat.update({
      //   where: {
      //     id: findChat.id,
      //   },
      //   data: {
      //     messages: {
      //       create: {
      //         content: content,
      //         senderId: senderId,
      //         receiverId: recivierId,
      //       },
      //     },
      //   },
      //   select: {
      //     messages: {
      //       take: 1,
      //       select: {
      //         id: true,
      //         sender: {
      //           select: {
      //             id: true,
      //             firstname: true,
      //             lastname: true,
      //             mainImage: true,
      //           },
      //         },
      //         content: true,
      //       },
      //     },
      //   },
      // });
      getIO().emit('messages', {
        action: 'sent',
        message: newMessage,
      });
    } else {
      const newChat = await prisma.chat.create({
        data: {
          messages: {
            create: {
              content: content,
              senderId: senderId,
              receiverId: recivierId,
            },
          },
          users: {
            connect: [{ id: senderId }, { id: recivierId }],
          },
        },
        select: {
          messages: {
            take: 1,
            select: {
              id: true,
              sender: {
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

      getIO().emit('messages', {
        action: 'sent',
        message: newChat.messages[0],
      });
    }

    res.status(StatusCodes.OK).json({ message: 'Message has been sent' });
  } catch (error) {
    next(error);
  }
};

const getChat = async (req: Request, res: Response, next: NextFunction) => {
  const user1Id = req.userId;
  const user2Id = req.params.id;
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        users: {
          every: {
            id: {
              in: [user1Id, user2Id],
            },
          },
        },
      },
      select: {
        messages: {
          select: {
            id: true,
            sender: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                mainImage: true,
              },
            },
            content: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (chat?.messages.length === 0) {
      throw new NotFoundError(`You do not have any msg with this User`);
    }
    res.status(StatusCodes.OK).json({ chat: chat });
  } catch (error) {}
};

const getAllChats = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  try {
    const userChats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        users: {
          where: {
            id: {
              not: userId,
            },
          },
          select: {
            id: true,
            firstname: true,
            lastname: true,
            mainImage: true,
          },
        },
      },
    });

    res.status(StatusCodes.OK).json({ allChats: userChats });
  } catch (error) {
    next(error);
  }
};

export {
  sendMessage,
  getChat,
  getAllChats,
  // getTableChat
};
