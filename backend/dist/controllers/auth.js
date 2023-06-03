"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const passwords_1 = require("../utils/passwords");
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const not_found_1 = __importDefault(require("../errors/not-found"));
const prisma = new client_1.PrismaClient();
const register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            throw new bad_request_1.default('User with that email adress already exist');
        }
        const hashedPw = await (0, passwords_1.hashPassword)(password);
        const newUser = await prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedPw,
                information: {
                    create: {
                        age: null,
                        city: null,
                        employed: null,
                        phoneNumber: null,
                        dateOfBirth: null,
                        placeOfBirth: null,
                        workPlace: null,
                    },
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'You have successfully registered, please log in to continue' });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                password: true,
                information: true,
                mainImage: true,
                allImages: true,
            },
        });
        if (!user) {
            throw new not_found_1.default('User with that email does not exist');
        }
        const comparePasswords = await (0, passwords_1.verifyPassword)(password, user.password);
        if (!comparePasswords) {
            throw new bad_request_1.default('Password is invalid');
        }
        const aToken = (0, jwt_1.signAtoken)({ firstname: user.firstname, lastname: user.lastname, email: user.email, id: user.id });
        const rToken = (0, jwt_1.signRToken)(user.id);
        user.password = '';
        res.status(http_status_codes_1.StatusCodes.OK).json({ aToken, rToken, user: { ...user, password: undefined } });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const changePassword = async (req, res, next) => {
    const userId = req.userId;
    const { newPassword, oldPassword } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                password: true,
            },
        });
        if (!user) {
            throw new not_found_1.default('Could not find user, something went wrong, please try agian later');
        }
        const isVerify = await (0, passwords_1.verifyPassword)(oldPassword, user.password);
        if (!isVerify) {
            throw new bad_request_1.default('Password is incorrect');
        }
        const hashedNewPw = await (0, passwords_1.hashPassword)(newPassword);
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password: hashedNewPw,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Uspesno ste promenili password' });
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
