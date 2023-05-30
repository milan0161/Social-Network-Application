/// <reference types="express-serve-static-core" />
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
declare const fileStorage: multer.StorageEngine;
declare const fileFilter: (request: Request, file: Express.Multer.File, callback: FileFilterCallback) => void;
export { fileFilter, fileStorage };
