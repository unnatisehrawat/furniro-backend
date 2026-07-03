import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const fixAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/furnico");
        console.log("Connected to DB");
        
        const result = await User.deleteOne({ role: "admin" });
        console.log("Deleted old admin users:", result.deletedCount);
        
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixAdmin();
