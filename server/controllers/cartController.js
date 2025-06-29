const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to get or create a cart for a user
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private (requires auth middleware to set req.user)
const getUserCart = asyncHandler(async (req, res) => {
  // Assuming req.user.id is set by auth middleware
  // const userId = req.user.id;
  // For now, let's allow passing userId for testing if req.user is not set up
  const userId = req.user ? req.user.id : req.query.userId;
  if (!userId) {
    res.status(400);
    throw new Error('User ID is required to fetch cart.');
  }

  const cart = await Cart.findOne({ user: userId }).populate('items.product', 'title price image');

  if (!cart) {
    // If no cart, return an empty cart structure
    return res.json({ user: userId, items: [], totalPrice: 0, totalQuantity: 0 });
  }

  // Calculate totals (can also be done with virtuals or pre-save hooks in model)
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  res.json({
    _id: cart._id,
    user: cart.user,
    items: cart.items,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalQuantity,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt
  });
});

// @desc    Add an item to the cart or update quantity
// @route   POST /api/cart
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  // const userId = req.user.id; // From auth middleware
  const userId = req.user ? req.user.id : req.body.userId; // Temporary for testing

  if (!userId) {
    res.status(400);
    throw new Error('User ID is required.');
  }
  if (!productId) {
    res.status(400);
    throw new Error('Product ID is required.');
  }
  if (isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
    res.status(400);
    throw new Error('Quantity must be a positive number.');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  if (product.stock < parseInt(quantity)) {
    res.status(400);
    throw new Error('Not enough product in stock');
  }

  const cart = await getOrCreateCart(userId);
  const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (existingItemIndex > -1) {
    // Item exists, update quantity
    cart.items[existingItemIndex].quantity += parseInt(quantity);
    if (cart.items[existingItemIndex].quantity > product.stock) {
        // Cap quantity at stock level if over-added
        cart.items[existingItemIndex].quantity = product.stock;
        // Optionally, send a message back about adjustment.
    }
  } else {
    // Item does not exist, add new item
    cart.items.push({
      product: productId,
      name: product.title, // Denormalized
      image: product.image, // Denormalized
      price: product.price, // Price at time of adding
      quantity: parseInt(quantity),
    });
  }

  await cart.save();
  // Re-fetch cart to send updated totals and populated items
  const updatedCart = await Cart.findById(cart._id).populate('items.product', 'title price image');
  const totalQuantity = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = updatedCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  res.status(200).json({
    _id: updatedCart._id,
    user: updatedCart.user,
    items: updatedCart.items,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalQuantity,
  });
});

// @desc    Update item quantity in the cart
// @route   PUT /api/cart/item/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  // const userId = req.user.id;
  const userId = req.user ? req.user.id : req.body.userId; // Temporary

  if (!userId) {
    res.status(400); throw new Error('User ID is required.');
  }
  if (isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
    res.status(400); throw new Error('Quantity must be a positive number.');
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404); throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex === -1) {
    res.status(404); throw new Error('Item not found in cart');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404); throw new Error('Product not found');
  }
  if (product.stock < parseInt(quantity)) {
    res.status(400); throw new Error('Not enough product in stock for desired quantity');
  }

  cart.items[itemIndex].quantity = parseInt(quantity);
  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate('items.product', 'title price image');
  const totalQuantity = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = updatedCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  res.json({
    _id: updatedCart._id,
    items: updatedCart.items,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalQuantity,
  });
});

// @desc    Remove an item from the cart
// @route   DELETE /api/cart/item/:productId
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  // const userId = req.user.id;
  const userId = req.user ? req.user.id : req.body.userId; // Temporary

  if (!userId) {
    res.status(400); throw new Error('User ID is required.');
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404); throw new Error('Cart not found');
  }

  const initialLength = cart.items.length;
  cart.items = cart.items.filter(item => item.product.toString() !== productId);

  if (cart.items.length === initialLength) {
    res.status(404); throw new Error('Item not found in cart');
  }

  await cart.save();
  const updatedCart = await Cart.findById(cart._id).populate('items.product', 'title price image');
  const totalQuantity = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = updatedCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  res.json({
    message: 'Item removed',
    _id: updatedCart._id,
    items: updatedCart.items,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalQuantity,
  });
});

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
};
