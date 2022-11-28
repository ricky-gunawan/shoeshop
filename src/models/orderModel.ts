import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  date: { type: String, required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      name: { type: String, required: true },
      img: { type: String, required: true },
      price: { type: String, required: true },
      brand: { type: String, required: true },
      color: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalItems: { type: Number, required: true },
  totalPrice: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  isPaid: { type: Boolean, required: true, default: false },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
