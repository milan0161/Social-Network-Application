"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilePicture = exports.getPictures = exports.setProfilePicture = void 0;
const client_1 = require("@prisma/client");
const not_found_1 = __importDefault(require("../errors/not-found"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const setProfilePicture = async (req, res, next) => {
    const userId = req.userId;
    const newMainImage = req.params.imageId;
    try {
        const image = await prisma.image.findUnique({
            where: {
                id: newMainImage,
            },
        });
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                mainImage: image?.path,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'You have successfully changed your profile picture' });
    }
    catch (error) {
        next(error);
    }
};
exports.setProfilePicture = setProfilePicture;
const getPictures = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const pictures = await prisma.image.findMany({
            where: {
                authorId: userId,
            },
            select: {
                authorId: true,
                id: true,
                path: true,
                post: {
                    select: {
                        content: true,
                    },
                },
            },
        });
        if (!pictures) {
            throw new not_found_1.default('You do not have any picture yet, please upload');
        }
        if (pictures.length === 0) {
            throw new not_found_1.default('You do not have any picture yet, please upload');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ allImages: pictures });
    }
    catch (error) {
        next(error);
    }
};
exports.getPictures = getPictures;
const getProfilePicture = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                mainImage: true,
            },
        });
        if (!user?.mainImage) {
            throw new not_found_1.default(`You don't have a profile picture set yet`);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ profilePicture: user.mainImage });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfilePicture = getProfilePicture;
