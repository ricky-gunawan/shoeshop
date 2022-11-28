import express from "express";
import { deleteCart, getCart, getCarts, updateCart } from "../controller/admin/cart";

const adminCartRoutes = express.Router();

adminCartRoutes.route("/").get(getCarts);

adminCartRoutes.route("/:userId").get(getCart).put(updateCart).delete(deleteCart);

export default adminCartRoutes;
