import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import "dotenv/config";
import User from "../models/userModel";
import { CustomError } from "../models/customError";

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const { name, email, password, address } = req.body;

  const user = await User.findOne({ email, _id: { $ne: userId } });

  if (user) {
    throw new CustomError("Email has been used", 400);
  } else {
    if (password) {
      const hashPassword = await bcrypt.hashSync(password, 10);
      await User.findByIdAndUpdate(userId, { $set: { name, email, password: hashPassword, address } }, { runValidators: true, new: true });
    } else {
      await User.findByIdAndUpdate(userId, { $set: { name, email, address } }, { runValidators: true, new: true });
    }
    res.send({ message: "user updated" });
  }
});

export default updateProfile;
