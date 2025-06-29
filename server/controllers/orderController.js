const Order = require('../models/Order');
const Cart = require('../models/Cart'); // To clear cart after order
const Product = require('../models/Product'); // To update stock
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  // const userId = req.user.id; // From auth middleware
  const userId = req.user ? req.user.id : req.body.userId; // Temporary for testing

  if (!userId) {
    res.status(401);
    throw new Error('Not authorized, no user ID provided');
  }

  const {
    orderItems, // Should come from a validated source, e.g., cart
    shippingAddress,
    paymentMethod,
    itemsPrice, // Subtotal of items
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  if (!shippingAddress || !paymentMethod || itemsPrice === undefined || totalPrice === undefined) {
    res.status(400);
    throw new Error('Missing required order information (address, payment method, prices)');
  }

  // Basic validation for prices (more can be added)
  if (parseFloat(itemsPrice) < 0 || parseFloat(totalPrice) < 0) {
      res.status(400);
      throw new Error('Prices cannot be negative.');
  }

  // In a real app, you'd re-verify prices against the database, not trust client-side calculation for itemsPrice & totalPrice.
  // For now, we'll trust the input but this is a security/integrity risk.

  const order = new Order({
    user: userId,
    orderItems: orderItems.map(item => ({ // Ensure structure matches OrderItemSchema
        product: item.product, // product should be ObjectId
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
    })),
    shippingAddress,
    paymentMethod,
    itemsPrice: parseFloat(itemsPrice),
    taxPrice: parseFloat(taxPrice) || 0,
    shippingPrice: parseFloat(shippingPrice) || 0,
    totalPrice: parseFloat(totalPrice),
  });

  const createdOrder = await order.save();

  // TODO: After order creation:
  // 1. Decrease product stock for each item in orderItems
  for (const item of createdOrder.orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock -= item.quantity;
      // Potentially add a check here if stock goes < 0, though it should be checked before order.
      await product.save({ validateBeforeSave: false }); // Skip full validation if only updating stock
    }
  }

  // 2. Clear the user's cart (optional, based on UX)
  // For now, let's assume cart is cleared on frontend or a separate call.
  // await Cart.deleteOne({ user: userId });

  res.status(201).json(createdOrder);
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  // const userId = req.user.id;
  const userId = req.user ? req.user.id : req.query.userId; // Temporary
  if (!userId) {
    res.status(401);
    throw new Error('Not authorized, no user ID provided');
  }
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (User can access their own, Admin can access any)
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user', // Field in Order model
    'name email' // Fields from User model to populate
  );

  if (order) {
    // TODO: Add authorization check:
    // if (order.user._id.toString() !== req.user.id && !req.user.isAdmin) {
    //   res.status(401);
    //   throw new Error('Not authorized to view this order');
    // }
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private (or Admin/Payment Gateway)
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // paymentResult would come from payment provider (e.g., PayPal, Stripe)
    order.paymentResult = {
      id: req.body.id, // Payment ID
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // TODO: This should be an Admin only action. Add admin check with auth middleware.
  const order = await Order.findById(req.params.id);

  if (order) {
    if (!order.isPaid) {
        res.status(400);
        throw new Error('Order is not paid yet, cannot mark as delivered.');
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};
