"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    const hashPassword = bcrypt_1.default.hash(password, 12);
    return hashPassword;
};
exports.hashPassword = hashPassword;
const verifyPassword = (loginPassword, userPassword) => {
    const comparePasswords = bcrypt_1.default.compare(loginPassword, userPassword);
    return comparePasswords;
};
exports.verifyPassword = verifyPassword;
