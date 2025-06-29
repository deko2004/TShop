const express = require('express');
const router = express.Router();

// Placeholder for controller functions
const {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,    // Admin / Payment Gateway
  updateOrderToDelivered // Admin
} = require('../controllers/orderController');

// Placeholder for auth middleware
// const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
// router.post('/', protect, createOrder);
router.post('/', createOrder); // Assuming protect middleware for req.user

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
// router.get('/myorders', protect, getUserOrders);
router.get('/myorders', getUserOrders); // Assuming protect middleware for req.user

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (User can access their own order, Admin can access any)
// router.get('/:id', protect, getOrderById);
router.get('/:id', getOrderById); // Logic inside controller to check user or admin

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private (Potentially also restricted, or called by payment gateway)
// router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/pay', updateOrderToPaid);

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
// router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.put('/:id/deliver', updateOrderToDelivered); // Temporarily open

module.exports = router;
