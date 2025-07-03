const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    Pro_category: { type: String, required: true },
    Animal_Category: { type: String, required: true },
    image: { type: [String], required: true }, // Stores multiple image URLs
    quantity: { type: Number, required: true },
    subcategory: { type: String, required: true }
});

module.exports = mongoose.model('Products', ProductSchema);
