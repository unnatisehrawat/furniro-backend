import express from "express"
import { uploadCategory } from "../config/multer.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryById
} from "../controllers/categoryController.js";


const router = express.Router();

router.get("/", getCategories)
router.get("/:id", getCategoryById)
router.post("/", protectAdmin, uploadCategory.single("image"), createCategory)
router.delete("/:id", protectAdmin, deleteCategory)

export default router