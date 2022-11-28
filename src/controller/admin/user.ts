import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import User from "../../models/userModel";
import { CustomError } from "../../models/customError";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  const usersData = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      roles: user.roles,
    };
  });
  res.json(usersData);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.userId;
  if (!isValidObjectId(_id)) {
    throw new CustomError(`Invalid ID`, 400);
  }

  const user = await User.findById(_id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      roles: user.roles,
    });
  } else {
    throw new CustomError(`Couldn't find the user with ID: ${_id}`, 404);
  }
});

export const updateUser = asyncHandler(async (req: any, res: Response) => {
  const _id = req.params.userId;
  const { name, email, password, address, roles } = req.body;

  const user = await User.findOne({ email, _id: { $ne: _id } });

  if (user) {
    throw new CustomError("Email has been used", 400);
  } else {
    if (password) {
      const hashPassword = await bcrypt.hashSync(password, 10);
      await User.findByIdAndUpdate(_id, { $set: { name, email, password: hashPassword, address, roles } }, { runValidators: true, new: true });
    } else {
      await User.findByIdAndUpdate(_id, { $set: { name, email, password, address, roles } }, { runValidators: true, new: true });
    }
    res.send({ message: "user updated" });
  }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.userId;
  await User.deleteOne({ _id });
  res.send({ message: "User deleted" });
});
