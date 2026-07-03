import * as productService from "../services/productService.js";


export const getProducts = async (req, res) => {
  try {
    const { category } = req.query; 
    const products = await productService.getAllProducts(category);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, price, description, size, categoryId, rating } = req.body;

    
    if (!name || !price || !description || !size || !categoryId) {
      return res.status(400).json({ message: "All fields (name, price, description, size, categoryId) are required" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path; 
    } 
    if (!imageUrl) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const newProduct = await productService.createNewProduct({
      name,
      price: Number(price),
      description,
      size,
      categoryId,
      rating: rating ? Number(rating) : 0,
      image: imageUrl
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.deleteProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
