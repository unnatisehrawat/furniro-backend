import Cart from "../models/cart.js";

export const getCart = async (userId) => {
    const result = await Cart.findOne({ userId }).populate("items.productId");
    return result
};




export const addToCart = async (userId, productId) => {
  let cart = await Cart.findOne({ userId });

 
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  // Check if product already exists in the cart
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    
    cart.items.push({ productId, quantity: 1 });
  }

  return await cart.save();
};


export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  return await cart.save();
};


export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  cart.items = [];
  return await cart.save();
};
