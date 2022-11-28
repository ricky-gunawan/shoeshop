import express from "express";
import updateProfile from "../controller/updateProfile";

const userRoutes = express.Router();

userRoutes.route("/").put(updateProfile);

export default userRoutes;
