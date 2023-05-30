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
exports.signRToken = exports.signAtoken = exports.p = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
exports.p = path_1.default.join(__dirname, '..', '..');
const PRIV_KEY = fs_1.default.readFileSync(exports.p + '/priv_key.pem', 'utf8');
const signAtoken = (user) => {
    const aToken = jwt.sign(user, PRIV_KEY, { algorithm: 'RS256', expiresIn: '1h' });
    return aToken;
};
exports.signAtoken = signAtoken;
const signRToken = (id) => {
    const rToken = jwt.sign({ id: id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return rToken;
};
exports.signRToken = signRToken;
