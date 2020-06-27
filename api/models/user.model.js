const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: 'This field is required',
    },
    lastName: {
      type: String,
      required: 'This field is required',
    },
    email: {
      type: String,
      required: 'This field is required',
      unique: true,
    },
    mobile: { type: String },
    city: { type: String },
    companyName: {
      type: String,
      required: 'This field is required',
    },
    password: { type: String, required: 'This field is required' },
    role: {
      type: String,
      default: 'employee',
      enum: ['super_admin', 'admin', 'employee'],
    },
  },
  { strict: true },
);

mongoose.model('User', userSchema);
