import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel";

export const getOrders = asyncHandler(async (req: any, res: Response) => {
  const userId = req.userId;
  let orders: {};
  orders = await Order.find({ user: userId });
  res.json(orders);
});

export const createOrder = asyncHandler(async (req: any, res: Response) => {
  const userId = req.userId;
  const { date, items, totalItems, totalPrice, address, payment } = req.body;
  await Order.create({ user: userId, date, items, totalItems, totalPrice, address, payment });
  res.status(201).send({ message: "Order created" });
});
