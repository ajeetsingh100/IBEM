import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
    },
  ],
  totalAmount: Number,
  address: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
