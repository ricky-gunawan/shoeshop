import express from "express";
import { uploadImage } from "../controller/admin/upload";
import uploadMiddleware from "../middleware/uploadMiddleware";

const adminUploadRoutes = express.Router();

adminUploadRoutes.route("/").post(uploadMiddleware, uploadImage);

export default adminUploadRoutes;
