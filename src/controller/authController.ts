import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CustomError } from "../models/customError";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "";
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET || "";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, address } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new CustomError("Email has been used", 409);
  } else {
    const hashPassword = await bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: hashPassword, address, roles: [11] });

    res.status(201).send({ message: "user created" });
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const userPassword: string = user?.password || "";
  const pass = await bcrypt.compare(password, userPassword);

  if (user && pass) {
    const accessToken = jwt.sign(
      {
        userInfo: {
          _id: user._id,
          roles: user.roles,
        },
      },
      access_token_secret,
      { expiresIn: "10s" }
    );

    const refreshTokenCookies = req.cookies?.jwt;
    const savedRefreshTokens = user.refreshToken.filter((token) => token !== refreshTokenCookies);

    const newRefreshToken = jwt.sign({ _id: user._id }, refresh_token_secret, { expiresIn: "1d" });
    savedRefreshTokens.push(newRefreshToken);

    await User.findOneAndUpdate({ email }, { $set: { refreshToken: savedRefreshTokens } });

    const userCred = {
      roles: user.roles,
      accessToken,
    };

    res.cookie("jwt", newRefreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1 * 24 * 60 * 60 * 1000 });
    res.json(userCred);
  } else {
    throw new CustomError("email or password wrong.", 401);
  }
});

export const handleRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) throw new CustomError("Not Authorized", 401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) throw new CustomError("Forbidden", 403);

  try {
    const decode: any = jwt.verify(refreshToken, refresh_token_secret);
    if (foundUser._id.toString() !== decode._id) throw new CustomError("Forbidden", 403);
    const accessToken = jwt.sign(
      {
        userInfo: {
          _id: foundUser._id,
          roles: foundUser.roles,
        },
      },
      access_token_secret,
      { expiresIn: "10s" }
    );

    const userCred = {
      roles: foundUser.roles,
      accessToken,
    };

    res.json(userCred);
  } catch (error) {
    throw new CustomError("Forbidden", 403);
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
    res.sendStatus(204);
  }

  await User.findOneAndUpdate({ refreshToken }, { $set: { refreshToken: [] } });

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.sendStatus(204);
});
