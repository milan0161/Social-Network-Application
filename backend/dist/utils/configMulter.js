"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStorage = exports.fileFilter = void 0;
const multer_1 = __importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});
exports.fileStorage = fileStorage;
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
