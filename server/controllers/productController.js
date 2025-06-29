const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler'); // Simple asyncHandler utility

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // TODO: Add pagination, filtering, sorting options via query parameters
  const products = await Product.find({});
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error('No products found');
  }
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Product not found');
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin (Auth layer to be added)
const createProduct = asyncHandler(async (req, res) => {
  // For now, anyone can create. Later, this should be admin only.
  // const { name, price, description, image, brand, category, countInStock, productType, sku } = req.body;

  // A more robust way is to create an empty product and let admin update it
  // Or expect all fields from req.body
  const product = new Product({
    title: req.body.title || 'Sample Product',
    price: req.body.price || 0,
    // user: req.user._id, // When auth is added, link to user who created it
    image: req.body.image || '/images/sample.jpg',
    images: req.body.images || [],
    brand: req.body.brand || 'Sample Brand',
    category: req.body.category || 'Sample Category',
    productType: req.body.productType || 'Sample Type',
    stock: req.body.stock || 0,
    numReviews: 0,
    description: req.body.description || 'Sample description',
    sku: req.body.sku || `SAMPLE${Date.now()}`, // Ensure SKU is unique
    dimensions: req.body.dimensions || '',
    weight: req.body.weight || ''
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400); // Bad request if validation fails (e.g. SKU not unique)
    throw new Error(error.message || 'Product creation failed');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin (Auth layer to be added)
const updateProduct = asyncHandler(async (req, res) => {
  const { title, price, description, image, images, brand, category, stock, productType, sku, dimensions, weight } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title || product.title;
    product.price = price === undefined ? product.price : price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.images = images || product.images;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.stock = stock === undefined ? product.stock : stock;
    product.productType = productType || product.productType;
    product.sku = sku || product.sku;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;

    try {
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      res.status(400);
      throw new Error(error.message || 'Product update failed');
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin (Auth layer to be added)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne(); // or Product.deleteOne({ _id: req.params.id })
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
