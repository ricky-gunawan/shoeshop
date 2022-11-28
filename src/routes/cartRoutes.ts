import express from "express";
import { getCart, updateCart } from "../controller/customer/cart";

const cartRoutes = express.Router();

cartRoutes.route("/").get(getCart).put(updateCart);

export default cartRoutes;
