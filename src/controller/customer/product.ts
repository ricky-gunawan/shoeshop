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
