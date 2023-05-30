"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUser = exports.followUser = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const prisma = new client_1.PrismaClient();
const followUser = async (req, res, next) => {
    const userId = req.userId;
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
            throw new bad_request_1.default(`You already follow ${userToFollow?.firstname} ${userToFollow?.lastname}`);
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
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: `You have successfully followed a user ${userToFollow?.firstname} ${userToFollow?.lastname}` });
    }
    catch (error) {
        next(error);
    }
};
exports.followUser = followUser;
const unfollowUser = async (req, res, next) => {
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
            throw new bad_request_1.default(`Unable to unfollow, you are not following ${user?.firstname} ${user?.lastname}`);
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
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: `You have successfully unfollowed a user ${user?.firstname} ${user?.lastname}` });
    }
    catch (error) {
        next(error);
    }
};
exports.unfollowUser = unfollowUser;
