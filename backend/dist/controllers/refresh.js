"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = void 0;
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const client_1 = require("@prisma/client");
require('dotenv').config();
const jwt = __importStar(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
const refreshTokens = async (req, res, next) => {
    const { rToken } = req.body;
    try {
        if (!rToken) {
            throw new unauthenticated_1.default('You are not authorized for this action, please login to continue');
        }
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const decodedToken = jwt.verify(rToken, secret);
        if (typeof decodedToken === 'string') {
            throw new unauthenticated_1.default('Invalid Token');
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                mainImage: true,
                allImages: true,
            },
        });
        const aToken = (0, jwt_1.signAtoken)({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user.id,
        });
        const newRToken = (0, jwt_1.signRToken)(user.id);
        res.status(http_status_codes_1.StatusCodes.OK).json({ aToken: aToken, rToken: newRToken });
    }
    catch (error) {
        next(error);
    }
};
exports.refreshTokens = refreshTokens;
