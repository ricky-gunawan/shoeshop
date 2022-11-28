import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { CustomError } from "../models/customError";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
    callback(null, path.join(path.resolve(), "dist/assets/images"));
  },

  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname);
  },
});

const fileFilter = (request: Request, file: Express.Multer.File, callback: any): void => {
  if (file.mimetype === "image/webp" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    callback(new Error(), false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter }).single("image");

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      const err = new CustomError("Server Error");
      next(err);
    } else if (err) {
      const err = new CustomError("Invalid File", 400);
      next(err);
    } else if (!req.file) {
      const err = new CustomError("File is required", 400);
      next(err);
    }

    next();
  });
};

export default uploadMiddleware;
