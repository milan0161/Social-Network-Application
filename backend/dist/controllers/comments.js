"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = exports.createComment = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const not_found_1 = __importDefault(require("../errors/not-found"));
const prisma = new client_1.PrismaClient();
const createComment = async (req, res, next) => {
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
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ comment: comment });
    }
    catch (error) {
        next(error);
    }
};
exports.createComment = createComment;
const editComment = async (req, res, next) => {
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
            throw new not_found_1.default(`Comment can't be found`);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ comment: comment });
    }
    catch (error) {
        next(error);
    }
};
exports.editComment = editComment;
