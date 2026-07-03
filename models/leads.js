import mongoose from "mongoose"

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String }, 
  message: { type: String, required: true },
}, { timestamps: true })

export default mongoose.models.Leads || mongoose.model("Leads", leadSchema)
