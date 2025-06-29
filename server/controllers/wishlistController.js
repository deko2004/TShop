const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to get or create a wishlist for a user
const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, items: [] });
  }
  return wishlist;
};

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private (requires auth middleware to set req.user)
const getUserWishlist = asyncHandler(async (req, res) => {
  // const userId = req.user.id;
  const userId = req.user ? req.user.id : req.query.userId; // Temporary for testing
  if (!userId) {
    res.status(400);
    throw new Error('User ID is required to fetch wishlist.');
  }

  const wishlist = await Wishlist.findOne({ user: userId })
    .populate('items.product', 'title price image category'); // Populate product details

  if (!wishlist) {
    // If no wishlist, return an empty wishlist structure
    return res.json({ user: userId, items: [] });
  }

  // Map items to include the product details directly
  const populatedItems = wishlist.items.map(item => ({
      productId: item.product._id, // Keep product ID separate
      name: item.product.title,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      addedAt: item.addedAt
  }));

  res.json({
    _id: wishlist._id,
    user: wishlist.user,
    items: populatedItems, // Send the mapped items
    createdAt: wishlist.createdAt,
    updatedAt: wishlist.updatedAt
  });
});

// @desc    Add an item to the wishlist
// @route   POST /api/wishlist
// @access  Private
const addItemToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  // const userId = req.user.id;
  const userId = req.user ? req.user.id : req.body.userId; // Temporary

  if (!userId) {
    res.status(400); throw new Error('User ID is required.');
  }
  if (!productId) {
    res.status(400); throw new Error('Product ID is required.');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404); throw new Error('Product not found');
  }

  const wishlist = await getOrCreateWishlist(userId);

  // Check if item already exists in wishlist
  const itemExists = wishlist.items.some(item => item.product.toString() === productId);
  if (itemExists) {
    res.status(400); throw new Error('Item already in wishlist');
  }

  wishlist.items.push({
    product: productId,
    name: product.title, // Denormalized
    image: product.image, // Denormalized
    price: product.price, // Price at time of adding for reference
  });

  await wishlist.save();
  // Re-fetch and populate to return the full wishlist item detail
  const updatedWishlist = await Wishlist.findById(wishlist._id)
                                  .populate('items.product', 'title price image category');

  const populatedItems = updatedWishlist.items.map(item => ({
      productId: item.product._id,
      name: item.product.title,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      addedAt: item.addedAt
  }));

  res.status(201).json({
    _id: updatedWishlist._id,
    user: updatedWishlist.user,
    items: populatedItems,
  });
});

// @desc    Remove an item from the wishlist
// @route   DELETE /api/wishlist/item/:productId
// @access  Private
const removeItemFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  // const userId = req.user.id;
  const userId = req.user ? req.user.id : req.body.userId; // Temporary

  if (!userId) {
    res.status(400); throw new Error('User ID is required.');
  }

  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    res.status(404); throw new Error('Wishlist not found');
  }

  const initialLength = wishlist.items.length;
  wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);

  if (wishlist.items.length === initialLength) {
    res.status(404); throw new Error('Item not found in wishlist');
  }

  await wishlist.save();
  const updatedWishlist = await Wishlist.findById(wishlist._id)
                                  .populate('items.product', 'title price image category');

  const populatedItems = updatedWishlist.items.map(item => ({
      productId: item.product._id,
      name: item.product.title,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      addedAt: item.addedAt
  }));

  res.json({
    message: 'Item removed from wishlist',
    _id: updatedWishlist._id,
    items: populatedItems,
  });
});

module.exports = {
  getUserWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
};
