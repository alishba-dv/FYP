// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  saleName: { type: String, required: true },
  discountPercentage: { type: Number, required: true }, // Discount Percentage
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }, // Whether the sale is currently active
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
