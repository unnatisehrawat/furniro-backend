import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  size: { type: [String], required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
}, { timestamps: true })

export default mongoose.models.Products || mongoose.model("Products", productSchema)