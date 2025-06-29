const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Added cookie-parser
const connectDB = require('./config/db');

// Import route files
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Import error handling middleware (placeholders for now)
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config({ path: './server/.env' }); // Explicitly point to server/.env

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// Enable CORS - configure as needed for production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow frontend to connect
  credentials: true // Important for cookies
}));
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cookieParser()); // Cookie parser middleware

// Simple test route
app.get('/api/test', (req, res) => {
  res.send('API is running...');
});

// Mount routers
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware (to be defined)
// These should be defined after all routes
// app.use(notFound);
// app.use(errorHandler);

// --- Basic Error Handling (can be moved to errorMiddleware.js) ---
// 404 Not Found Middleware
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Generic Error Handler Middleware
// This will catch any errors passed by next(error)
app.use((err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose duplicate key (for unique fields like SKU or email)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered for ${field}. Please use another value.`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Combine multiple validation error messages if they exist
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});
// --- End Basic Error Handling ---


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Add script to package.json to run this server, e.g., "start": "node server/server.js"
// and "dev": "nodemon server/server.js"
// Modify "main" in server/package.json to "server.js" (currently index.js)
// Modify "type" in server/package.json to "module" if using ES6 imports, or keep "commonjs" for require.
// For now, it's "commonjs" and uses require.
