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
exports.isAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const jwt_1 = require("../utils/jwt");
const forbidden_error_1 = __importDefault(require("../errors/forbidden-error"));
const PUB_KEY = fs_1.default.readFileSync(jwt_1.p + '/pub_key.pem', 'utf8');
const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new forbidden_error_1.default('Not Authorized');
        }
        if (authHeader.split(' ')[0] !== 'Bearer') {
            throw new forbidden_error_1.default('Not Authorized');
        }
        jwt.verify(authHeader.split(' ')[1], PUB_KEY, { algorithms: ['RS256'] }, (error, payload) => {
            if (error) {
                throw new forbidden_error_1.default(error.message);
            }
            req.userId = payload.id;
        });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isAuth = isAuth;
