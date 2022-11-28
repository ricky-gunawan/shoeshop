import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
