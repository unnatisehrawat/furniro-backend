import mongoose from "mongoose";
import dns from "dns";

// Root cause fix: Node.js on this machine resolves DNS via 127.0.0.1 (set by VPN/Docker/etc)
// but nothing is listening there on port 53, causing ECONNREFUSED on SRV lookups.
// Force Node.js to use Google (8.8.8.8) and Cloudflare (1.1.1.1) public DNS instead.
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4,
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database connection failed:", error);
        throw error;
    }
}

export default connectDB;