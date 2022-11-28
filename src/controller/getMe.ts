import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import "dotenv/config";
import User from "../models/userModel";
import { CustomError } from "../models/customError";

const getMe = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.userId;
  const user = await User.findById(_id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
    });
  } else {
    throw new CustomError(`Couldn't find the user with ID: ${_id}`, 404);
  }
});

export default getMe;
