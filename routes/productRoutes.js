import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} from "../controllers/productController.js";
import { uploadProduct } from "../config/multer.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);


router.get("/:id", getProductById);


router.post("/", protectAdmin, uploadProduct.single("image"), createProduct);


router.delete("/:id", protectAdmin, deleteProduct);

export default router;
