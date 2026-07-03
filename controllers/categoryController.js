import * as categoryService from "../services/categoryService.js";


export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};


export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category", error: error.message });
  }
};


export const createCategory = async (req, res) => {
  console.log("name :::::" , req.body)
  console.log("file:::::" , req.file)
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    
    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path;
    } 

    if (!imageUrl) {
      return res.status(400).json({ message: "Category image is required" });
    }

    const newCategory = await categoryService.createNewCategory({
      name,
      image: imageUrl,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error: error.message });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.deleteCategoryById(id);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};
