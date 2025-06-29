const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(res, user._id); // Sets cookie and returns token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token, // Send token in response body as well
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token (login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(res, user._id); // Sets cookie and returns token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token, // Send token in response body as well
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
});

// Placeholder for getUserProfile
// const getUserProfile = asyncHandler(async (req, res) => {
//   // req.user would be set by the protect middleware
//   const user = await User.findById(req.user._id).select('-password');
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// Placeholder for updateUserProfile
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(req.body.password, salt);
//     }
//     const updatedUser = await user.save();
//     const token = generateToken(res, updatedUser._id);
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: token,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

module.exports = {
  registerUser,
  loginUser,
  // getUserProfile,
  // updateUserProfile,
};
