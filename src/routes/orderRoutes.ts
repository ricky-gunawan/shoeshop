import express from "express";
import { createOrder, getOrders } from "../controller/customer/order";

const orderRoutes = express.Router();

orderRoutes.route("/").get(getOrders).post(createOrder);

export default orderRoutes;
