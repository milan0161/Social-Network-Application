"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const forbidden_error_1 = __importDefault(require("../errors/forbidden-error"));
const errorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof unauthenticated_1.default) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof bad_request_1.default) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof not_found_1.default) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof forbidden_error_1.default) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        // 'Something went wront, please try again later'
    });
};
exports.default = errorHandlerMiddleware;
