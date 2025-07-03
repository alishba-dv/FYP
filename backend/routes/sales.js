// routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Create a new sale
router.post('/create', async (req, res) => {
  try {
    const { saleName, discountPercentage, startDate, endDate, isActive } = req.body;
    const newSale = new Sale({
      saleName,
      discountPercentage,
      startDate,
      endDate,
      isActive,
    });

    await newSale.save();
    res.status(201).json({ message: 'Sale created successfully', sale: newSale });
  } catch (err) {
    res.status(500).json({ message: 'Error creating sale', error: err });
  }
});

// Fetch all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales', error: err });
  }
});

// Update a sale (e.g., activate/deactivate, change discount, etc.)
router.put('/update/:id', async (req, res) => {
  try {
    const { saleName, discountPercentage, startDate, endDate, isActive } = req.body;
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      { saleName, discountPercentage, startDate, endDate, isActive },
      { new: true }
    );
    res.json({ message: 'Sale updated successfully', sale: updatedSale });
  } catch (err) {
    res.status(500).json({ message: 'Error updating sale', error: err });
  }
});
// DELETE Sale by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedSale = await Sale.findByIdAndDelete(req.params.id);
  
      if (!deletedSale) {
        return res.status(404).json({ message: 'Sale not found' });
      }
  
      res.status(200).json({ message: 'Sale deleted successfully', sale: deletedSale });
    } catch (err) {
      console.error('Error deleting sale:', err);
      res.status(500).json({ message: 'Error deleting sale', error: err.message });
    }
  });
module.exports = router;
2