import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel";

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  let orders: {};
  orders = await Order.find({});
  res.json(orders);
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  let orders: {};
  orders = (await Order.findById(orderId)) || {};
  res.json(orders);
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const { date, items, totalItems, totalPrice, address, payment, isPaid } = req.body;
  await Order.findByIdAndUpdate(orderId, { $set: { date, items, totalItems, totalPrice, address, payment, isPaid } });
  res.send({ message: "Order updated" });
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  await Order.deleteOne({ _id: orderId });
  res.send({ message: "Order deleted" });
});
