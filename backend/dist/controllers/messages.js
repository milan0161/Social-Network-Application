"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChats = exports.getChat = exports.sendMessage = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const socket_1 = require("../utils/socket");
const not_found_1 = __importDefault(require("../errors/not-found"));
const prisma = new client_1.PrismaClient();
const sendMessage = async (req, res, next) => {
    const senderId = req.userId;
    const recivierId = req.params.id;
    const { content } = req.body;
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
            (0, socket_1.getIO)().emit('messages', {
                action: 'sent',
                message: newMessage,
            });
        }
        else {
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
            (0, socket_1.getIO)().emit('messages', {
                action: 'sent',
                message: newChat.messages[0],
            });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Message has been sent' });
    }
    catch (error) {
        next(error);
    }
};
exports.sendMessage = sendMessage;
const getChat = async (req, res, next) => {
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
            throw new not_found_1.default(`You do not have any msg with this User`);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ chat: chat });
    }
    catch (error) { }
};
exports.getChat = getChat;
const getAllChats = async (req, res, next) => {
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
        res.status(http_status_codes_1.StatusCodes.OK).json({ allChats: userChats });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllChats = getAllChats;
