import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/admin/product";

const adminProductRoutes = express.Router();

adminProductRoutes.route("/").get(getProducts).post(createProduct);

adminProductRoutes.route("/:productId").get(getProduct).put(updateProduct).delete(deleteProduct);

export default adminProductRoutes;
