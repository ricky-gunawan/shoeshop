import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/admin/user";
import updateProfile from "../controller/updateProfile";

const adminUserRoutes = express.Router();

adminUserRoutes.route("/").get(getUsers).put(updateProfile);

adminUserRoutes.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

export default adminUserRoutes;
