import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../models/customError";
import asyncHandler from "express-async-handler";

const verifyJWT = asyncHandler(async (req: Request, _, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!(authorization && authorization.startsWith("Bearer"))) {
    throw new CustomError("Not Authorized", 401);
  }

  const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "";

  const token = authorization.split(" ")[1];

  try {
    const decode: any = jwt.verify(token, access_token_secret);
    req.userId = decode.userInfo._id;
    req.userRoles = decode.userInfo.roles;
  } catch (error) {
    throw new CustomError("Invalid Token", 403);
  }

  next();
});

export default verifyJWT;
