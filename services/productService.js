import Products from "../models/products.js";

export const getAllProducts = async (categoryId) => {
  let query = {};
  if (categoryId) {
    query.categoryId = categoryId;
  }
  return await Products.find(query)
    .populate("categoryId", "name image")
    .sort({ createdAt: -1 });
};



export const getProductById = async (id) => {
  return await Products.findById(id).populate("categoryId", "name image");
};


export const createNewProduct = async (productData) => {
  return await Products.create(productData);
};


export const deleteProductById = async (id) => {
  return await Products.findByIdAndDelete(id);
};
