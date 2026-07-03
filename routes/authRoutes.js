import express from "express";
import { register, login, logout , verifyAuth } from "../controllers/authController.js";
import { protect, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/verify", protect, verifyAuth);

export default router;
