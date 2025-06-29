const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { // Denormalized for easier access without populating product everywhere
    type: String,
    required: true,
  },
  image: { // Denormalized for easier access
    type: String,
    required: true,
  },
  price: { // Price at the time of adding to cart
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each user has only one cart
  },
  items: [cartItemSchema],
  // It might be better to calculate totalPrice and totalQuantity dynamically
  // or update them using pre-save hooks or methods to ensure accuracy.
  // For now, let's assume they will be calculated on the fly or updated by controllers.
  // lastUpdated: { // To track when the cart was last modified
  //   type: Date,
  //   default: Date.now
  // }
}, {
  timestamps: true,
});

// Example of a virtual for total price (can also be a method or calculated in controllers)
// cartSchema.virtual('totalPrice').get(function() {
//   return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
// });

// cartSchema.virtual('totalQuantity').get(function() {
//   return this.items.reduce((total, item) => total + item.quantity, 0);
// });

// Ensure virtuals are included when converting to JSON/Object
// cartSchema.set('toObject', { virtuals: true });
// cartSchema.set('toJSON', { virtuals: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
