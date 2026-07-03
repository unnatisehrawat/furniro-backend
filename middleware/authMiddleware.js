import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        const token = req.cookies.token; 
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Unauthorized. Invalid or expired token." });
    }
};

export const protectAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token; 
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden. Admin access required." });
        }
        
        req.user = decoded; 
        
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Unauthorized. Invalid or expired token." });
    }
};
