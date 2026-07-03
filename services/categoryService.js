import Category from "../models/category.js";


export const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};


export const getCategoryById = async (id) => {
  return await Category.findById(id);
};


export const createNewCategory = async (categoryData) => {
  return await Category.create(categoryData);
};




export const deleteCategoryById = async (id) => {
  return await Category.findByIdAndDelete(id);
};
