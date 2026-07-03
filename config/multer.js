import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// 1. Storage configuration for Category Images
const categoryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "furniro/categories",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// 2. Storage configuration for Product Images
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "furniro/products",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

// Export the upload middlewares
export const uploadCategory = multer({ storage: categoryStorage });
export const uploadProduct = multer({ storage: productStorage });
