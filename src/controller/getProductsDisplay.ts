import { Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

const getProductsDisplay = asyncHandler(async (_, res: Response) => {
  const products = await Product.aggregate([{ $sample: { size: 10 } }]);
  res.json(products);
});

export default getProductsDisplay;
