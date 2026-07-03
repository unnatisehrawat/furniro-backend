import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import bcrypt from "bcryptjs";

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/furnico");
        console.log("Connected to DB");
        
        const admin = await User.findOne({ role: "admin" });
        if (!admin) {
            console.log("NO ADMIN USER EXISTS IN DB. The seeder did not run!");
        } else {
            console.log("ADMIN FOUND:");
            console.log("Email:", admin.email);
            console.log("Password Hash:", admin.password);
            
            const envPass = process.env.ADMIN_PASSWORD;
            console.log("Env password:", envPass);
            
            if (!envPass) {
                console.log("ADMIN_PASSWORD is not set in .env!");
            } else {
                const match = await bcrypt.compare(envPass, admin.password);
                console.log("Does .env password match hash?", match);
            }
        }
        
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkDB();
