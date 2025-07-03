const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const {authMiddleware}=require('../middlewares/authMiddleware')

// Fetch users with their order counts
router.get('/users', authMiddleware,async (req, res) => {
  try {
    const usersWithOrders = await User.aggregate([
      {
        $match: {
          role: 'user', // Filter by role
        },
      },
      {
        $lookup: {
          from: 'orders',         // Collection to join
          localField: 'email',   // Field from User collection
          foreignField: 'email', // Field from Order collection
          as: 'userOrders'       // Output array field
        },
      },
      {
        $addFields: {
          orderCount: { $size: '$userOrders' }, // Count orders
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          orderCount: 1,
        },
      },
    ]);
console.log(usersWithOrders)
    res.status(200).json({
      message: 'Users with Order Counts Fetched',
      users: usersWithOrders,
    });
  } catch (error) {
    console.error('Error fetching users with orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
