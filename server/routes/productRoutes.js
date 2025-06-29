const express = require('express');
const router = express.Router();

// Placeholder for controller functions (to be created in the next step)
const {
  getProducts,
  getProductById,
  createProduct, // Admin
  updateProduct, // Admin
  deleteProduct  // Admin
} = require('../controllers/productController'); // Path to controllers

// Placeholder for auth middleware (to be created later)
// const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', getProducts);

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', getProductById);

// --- Admin Routes (Example placeholders) ---
// These routes would typically be protected and restricted to admin users

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
// router.post('/', protect, admin, createProduct);
router.post('/', createProduct); // Temporarily public for easier initial testing

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
// router.put('/:id', protect, admin, updateProduct);
router.put('/:id', updateProduct); // Temporarily public

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// router.delete('/:id', protect, admin, deleteProduct);
router.delete('/:id', deleteProduct); // Temporarily public

module.exports = router;
