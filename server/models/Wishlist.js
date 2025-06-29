const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { // Denormalized for easier access
    type: String,
    required: true,
  },
  image: { // Denormalized for easier access
    type: String,
    required: true,
  },
  price: { // Price at the time of adding to wishlist (for reference)
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  }
}, {_id: false}); // No separate _id for subdocuments if not needed, product ID is key

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each user has only one wishlist
  },
  items: [wishlistItemSchema],
}, {
  timestamps: true,
});

// To ensure product uniqueness within a user's wishlist, a compound index can be used
// or this logic can be handled at the application level (controller).
// For simplicity here, application-level check is assumed when adding items.

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
