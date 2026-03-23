import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  items: [itemSchema],
  total: { type: Number, required: true },
    status: {
    type: String,
    enum: ["pending", "preparing", "done", "collected"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
