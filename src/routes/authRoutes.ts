import express from "express";
import { handleRefreshToken, login, logout, register } from "../controller/authController";

const authRoutes = express.Router();

authRoutes.route("/register").post(register);
authRoutes.route("/login").post(login);
authRoutes.route("/refresh").get(handleRefreshToken);
authRoutes.route("/logout").get(logout);

export default authRoutes;
