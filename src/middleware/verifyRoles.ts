import { NextFunction, Request } from "express";
import asyncHandler from "express-async-handler";
import { CustomError } from "../models/customError";

const verifyRoles = (...allowedRoles: number[]) => {
  return asyncHandler(async (req: Request, _, next: NextFunction) => {
    if (!req.userRoles) throw new CustomError("Not Authorized", 401);
    const rolesArray = [...allowedRoles];
    const result = req.userRoles.map((role) => rolesArray.includes(role)).find((val) => val === true);
    if (!result) throw new CustomError("Not Authorized", 401);
    next();
  });
};

export default verifyRoles;
