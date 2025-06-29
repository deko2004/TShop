const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Product main image is required'],
  },
  images: [{
    type: String,
  }],
  productType: { // Renamed from 'type' to avoid conflict
    type: String,
    required: [true, 'Product type is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  brand: {
    type: String,
    required: [true, 'Product brand is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
  },
  numReviews: {
    type: Number,
    default: 0,
    min: [0, 'Number of reviews cannot be negative'],
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  sku: {
    type: String,
    required: [true, 'Product SKU is required'],
    unique: true,
    trim: true,
  },
  dimensions: {
    type: String,
  },
  weight: {
    type: String,
  },
  // If we decide to add actual reviews as subdocuments or references later
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Indexing for frequently queried fields
productSchema.index({ title: 'text', description: 'text', category: 1, brand: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
