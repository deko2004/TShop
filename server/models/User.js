const mongoose = require('mongoose');
// It's good practice to add a library like bcryptjs for password hashing
// For now, we'll define the schema, hashing would be implemented in the controller/hooks
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    // Basic email validation, more robust validation can be added
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    // Password will be selected: false by default if we don't want it returned in queries
    // select: false
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // You might want to add fields like shippingAddress, billingAddress, etc. later
  // shippingAddress: {
  //   address: { type: String },
  //   city: { type: String },
  //   postalCode: { type: String },
  //   country: { type: String },
  // },
}, {
  timestamps: true,
});

// TODO: Add pre-save hook for password hashing if not handled elsewhere
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// TODO: Add method to compare password for login
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
