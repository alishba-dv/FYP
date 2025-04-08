const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique:false },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  payment_status: { type: String, required: true },
  total_price: { type: Number, required: true },
 cartItem: { type: Object, required: true },
 date: {
  type: Date,
  default: Date.now
} 
  
});

module.exports = mongoose.model('Order', OrderSchema);
