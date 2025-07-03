const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const nodemailer = require('nodemailer');
const UserPlan = require('../models/UserPlan');
const Subscription = require('../models/Subscription');
const Sale = require('../models/Sale');

router.post('/checkout', async (req, res) => {
  try {
    let { cartItem, userId } = req.body;

    // If userId not provided in body, get it from cookies
    if (!userId && req.cookies && req.cookies.userId) {
      userId = req.cookies.userId;
    }

    console.log("User ID:", userId);
    console.log("Cart Data from backend:", cartItem);

    // Fetch all user plans for the current user
    const userPlans = await UserPlan.find({ user: userId });
    console.log("User Plans:", userPlans);

    // Collect subscription IDs from user plans
    const subscriptionIds = userPlans.map(plan => plan.subscription);
    console.log("Subscription IDs:", subscriptionIds);

    // Fetch all subscriptions
    const subscriptions = await Subscription.find({ '_id': { $in: subscriptionIds } });
    console.log("Subscribed packages: ", subscriptions);

    // Get active sale
    const currentDate = new Date();
    const activeSale = await Sale.findOne({
      isActive: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    });

    let saleDiscount = 0;
    if (activeSale) {
      saleDiscount = activeSale.discountPercentage || 0;
    }

    // Combine all features from all subscriptions
    let allFeatures = [];
    subscriptions.forEach(subscription => {
      allFeatures = [...allFeatures, ...(subscription.features || [])];
    });

    // (Optional: Apply feature logic if needed)
    // Example switch block (You can modify or remove this if not needed)
    allFeatures.forEach(feature => {
      switch (feature) {
        case "10% off":
          // Already handled by saleDiscount
          break;
        // Add more features as needed
        default:
          break;
      }
    });

    // Check stock availability
    if (!cartItem || typeof cartItem !== 'object' || Object.keys(cartItem).length === 0) {
      return res.status(400).json({ message: 'Invalid or empty cart' });
    }

    for (const [productId, item] of Object.entries(cartItem)) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Only ${product.quantity} ${product.name}(s) in stock.`
        });
      }
    }

    // TODO: Create Order Logic

    return res.status(200).json({
      message: "OK",
      features: allFeatures,
      saleDiscount: saleDiscount
    });

  } catch (err) {
    console.error("Error details:", err);
    return res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});

module.exports = router;
