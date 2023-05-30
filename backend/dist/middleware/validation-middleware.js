"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const validationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.array().length === 0) {
        return next();
    }
    throw new bad_request_1.default(errors.array()[0].msg);
};
exports.validationMiddleware = validationMiddleware;
