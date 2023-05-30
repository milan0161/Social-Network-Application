"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInformations = exports.getAllUsers = exports.getFollowing = exports.getFollowers = exports.getAllUnfollowed = exports.getSingleUser = exports.updateInformations = exports.addInformations = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const not_found_1 = __importDefault(require("../errors/not-found"));
const prisma = new client_1.PrismaClient();
const addInformations = async (req, res, next) => {
    const { age, city, dateOfBirth, employed, phoneNumber, placeOfBirth, workPlace } = req.body;
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
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ informations: informations });
    }
    catch (error) {
        next(error);
    }
};
exports.addInformations = addInformations;
const updateInformations = async (req, res, next) => {
    const { age, city, dateOfBirth, employed, phoneNumber, placeOfBirth, workPlace } = req.body;
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
        res.status(http_status_codes_1.StatusCodes.OK).json({ informations: informations });
    }
    catch (error) {
        next(error);
    }
};
exports.updateInformations = updateInformations;
const getUserInformations = async (req, res, next) => {
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
            throw new not_found_1.default(`Currently no more info about this user.`);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ userInfo: userInfo.information });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserInformations = getUserInformations;
const getSingleUser = async (req, res, next) => {
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
            throw new not_found_1.default('Unable to find this user');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ user: user });
    }
    catch (error) {
        next(error);
    }
};
exports.getSingleUser = getSingleUser;
const getAllUnfollowed = async (req, res, next) => {
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
                        in: currentUser.following.map((user) => user.id),
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
            throw new not_found_1.default('No more available Users');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ users: users });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUnfollowed = getAllUnfollowed;
const getFollowers = async (req, res, next) => {
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
            throw new not_found_1.default('Something went wrong, please try again later');
        }
        if (getFollowers.followedBy.length === 0) {
            // res.status(StatusCodes.OK).json({ message: 'User does not have any follower yet' });
            throw new not_found_1.default('You have no followers yet');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ followers: getFollowers.followedBy });
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowers = getFollowers;
const getFollowing = async (req, res, next) => {
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
            throw new not_found_1.default('Something went wrong, please try again later');
        }
        if (getFollowing.following.length === 0) {
            throw new not_found_1.default('You do not follow anyone yet');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ following: getFollowing.following });
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowing = getFollowing;
const getAllUsers = async (req, res, next) => {
    const userId = req.userId;
    let { search } = req.query;
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
            throw new not_found_1.default('Something went wrong, we could not find any user');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ users: allUsers });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
