import express from "express";
import { getProduct, getProducts } from "../controller/customer/product";

const productRoutes = express.Router();

productRoutes.route("/").get(getProducts);

productRoutes.route("/:productId").get(getProduct);

export default productRoutes;
