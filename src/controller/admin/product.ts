import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import { CustomError } from "../../models/customError";
import Product from "../../models/productModel";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.productId;
  if (!isValidObjectId(_id)) {
    throw new CustomError(`Invalid ID`, 400);
  }

  let product: {};
  const searchProduct = await Product.findById(_id);
  if (searchProduct) {
    product = searchProduct;
  } else {
    throw new CustomError(`Couldn't find the product with ID: ${_id}`, 404);
  }

  res.json(product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { img, name, price, brand, color, description } = req.body;
  if (
    (brand === "adidas" || brand === "converse" || brand === "new balance" || brand === "nike" || brand === "puma" || brand === "reebok" || brand === "vans") &&
    (color === "black" || color === "white" || color === "red" || color === "blue" || color === "green")
  ) {
    await Product.create({ img, name, price, brand, color, description });
    res.status(201).send({ message: "Product created" });
  } else {
    throw new CustomError(`brand or color invalid`, 400);
  }
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.productId;
  const { img, name, price, brand, color, description } = req.body;
  if (
    (brand === "adidas" || brand === "converse" || brand === "new balance" || brand === "nike" || brand === "puma" || brand === "reebok" || brand === "vans" || brand === undefined) &&
    (color === "black" || color === "white" || color === "red" || color === "blue" || color === "green" || color === undefined)
  ) {
    await Product.findByIdAndUpdate(_id, { $set: { img, name, price, brand, color, description } }, { runValidators: true });
    res.send({ message: "Product created" });
  } else {
    throw new CustomError(`brand or color invalid`, 400);
  }
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.productId;
  await Product.deleteOne({ _id });
  res.send({ message: "Product deleted" });
});
