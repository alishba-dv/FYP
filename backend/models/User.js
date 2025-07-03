const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true  },
  // password: { type: String, required: true },
  hashedP:{ type: String, required: true},
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);

