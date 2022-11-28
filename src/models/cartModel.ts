import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      name: { type: String, required: true },
      img: { type: String, required: true },
      price: { type: String, required: true },
      brand: { type: String, required: true },
      color: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
