import express from "express";
import { userRegister, userLogin, adminLogin, logout, verifyAuth } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);

router.get("/verify", protect, verifyAuth);

export default router;
