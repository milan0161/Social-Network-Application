"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewFeeds = exports.getPosts = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const prisma = new client_1.PrismaClient();
const createPost = async (req, res, next) => {
    const userId = req.userId;
    const { content } = req.body;
    try {
        if (!req.files) {
            throw new bad_request_1.default('Please select at least one image');
        }
        if (req.files.length === 0) {
            throw new bad_request_1.default('Please select at least one image');
        }
        let images = req.files;
        const cnt = images.length;
        images?.forEach((image) => {
            images.push(image.path.replaceAll('\\', '/'));
        });
        images = images.slice(cnt);
        let obj = [];
        images.forEach((img) => {
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
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ post: post });
    }
    catch (error) {
        next(error);
    }
};
exports.createPost = createPost;
const getPosts = async (req, res, next) => {
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
            throw new not_found_1.default('User does not have any post yet');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ posts: posts });
    }
    catch (error) {
        next(error);
    }
};
exports.getPosts = getPosts;
const getNewFeeds = async (req, res, next) => {
    const userId = req.userId;
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 3;
    const skip = (page - 1) * take;
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
            throw new not_found_1.default('You are currently not following anyone, follow someone to get new feeds');
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
        res.status(http_status_codes_1.StatusCodes.OK).json({ posts: posts });
    }
    catch (error) {
        next(error);
    }
};
exports.getNewFeeds = getNewFeeds;
