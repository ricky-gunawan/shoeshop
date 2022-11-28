import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import { CustomError } from "../models/customError";
import Product from "../models/productModel";

const getSingleProductDisplay = expressAsyncHandler(async (req: Request, res: Response) => {
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

export default getSingleProductDisplay;
