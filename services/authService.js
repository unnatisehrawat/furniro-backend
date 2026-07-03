import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const initializeAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" });
        
        if (!adminExists) {
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPassword = process.env.ADMIN_PASSWORD;
            
            if (!adminEmail || !adminPassword) {
                console.error("ADMIN_EMAIL or ADMIN_PASSWORD missing in .env! Cannot seed admin.");
                return;
            }
            
            // Hash the password securely before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);
            
            const newAdmin = new User({
                name: "Furniro Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
            });
            
            await newAdmin.save();
            console.log("Admin user successfully seeded into the database.");
        } else {
            console.log("Admin user already exists. Skipping seeding.");
        }
    } catch (error) {
        console.error("Failed to seed admin user:", error.message);
    }
};
