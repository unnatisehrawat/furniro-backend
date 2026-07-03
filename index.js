import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config()


import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import leadRoutes from "./routes/leadRoutes.js"
import { initializeAdminUser } from "./services/authService.js";



const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", 
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB and then seed the Admin user
connectDB().then(() => {
    initializeAdminUser();
});

app.get("/", (req, res) => {
    res.send("server is running")
})

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/leads", leadRoutes)
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})