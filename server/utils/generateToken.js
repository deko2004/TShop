const jwt = require('jsonwebtoken');

// This function will usually be called after successful login or registration
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration (e.g., 30 days)
  });

  // Set JWT as an HTTP-Only cookie for security
  // This helps prevent XSS attacks from accessing the token via JavaScript
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production (HTTPS)
    sameSite: 'strict', // Mitigate CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return token; // Also return token if needed directly by the caller
};

module.exports = generateToken;
