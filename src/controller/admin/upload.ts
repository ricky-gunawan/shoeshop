import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file?.filename;
  res.send(file);
});
