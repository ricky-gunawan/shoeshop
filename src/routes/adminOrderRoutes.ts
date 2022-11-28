import express from "express";
import { deleteOrder, getOrder, getOrders, updateOrder } from "../controller/admin/order";

const adminOrderRoutes = express.Router();

adminOrderRoutes.route("/").get(getOrders);

adminOrderRoutes.route("/:orderId").get(getOrder).put(updateOrder).delete(deleteOrder);

export default adminOrderRoutes;
