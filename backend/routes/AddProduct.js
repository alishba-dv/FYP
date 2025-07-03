const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Products');
const fs = require('fs');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

const uploadDir = path.join(__dirname, '../public/uploads');

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads directory created at:', uploadDir);
}
// Set up Multer for multiple file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Add new product route (handles multiple images)
router.post('/add', authMiddleware, upload.array('images', 5), async (req, res) => {
    try {
        // Check if the product already exists
        const existingProduct = await Product.findOne({ name: req.body.name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with the same name already exists!' });
        }

        const { name, description, price, Pro_category, Animal_Category, quantity, subcategory } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be at least 1.' });
        }

        if (price < 1) {
            return res.status(400).json({ message: 'Price must be greater than zero.' });
        }

        // Extract filenames from uploaded images
        const images = req.files.map(file => file.filename);

        // Ensure at least one image is provided
        if (images.length === 0) {
            return res.status(400).json({ message: 'At least one image is required.' });
        }

        // Create and save the new product
        const newProduct = new Product({
            name,
            description,
            price,
            Pro_category,
            Animal_Category,
            quantity,
            image: images,
            subcategory
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
