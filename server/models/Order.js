const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: { // Price at the time of order
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
  },
}, {_id: false}); // No separate _id for subdocuments if not needed

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
  },
  paymentResult: { // Details from payment provider
    id: { type: String },
    status: { type: String },
    update_time: { type: String }, // Can be Date as well
    email_address: { type: String },
  },
  itemsPrice: { // Sum of (item.price * item.quantity)
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: { // itemsPrice + taxPrice + shippingPrice
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true, // createdAt, updatedAt
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
