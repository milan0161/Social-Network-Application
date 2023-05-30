import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const fileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb): void => {
    cb(null, './public/images');
  },
  filename: (req: Request, file: Express.Multer.File, callback): void => {
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  },
});

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export { fileFilter, fileStorage };
