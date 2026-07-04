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
const allowedOrigins = [
    "http://localhost:3000",
    "https://furniro-frontend-0s4m.onrender.com"
].filter(Boolean);

app.use(cors({
    allowedHeaders: ["Content-Type", "token", "authorization", "ipaddress", "latitude", "longitude", "machineid"],
    exposedHeaders: ["token", "authorization", "ipaddress", "latitude", "longitude", "machineid"],
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
}));

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB and then seed the Admin user
connectDB()
  .then(() => initializeAdminUser())
  .catch((err) => {
    console.error("Startup failed:", err);
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