const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const nodemailer = require('nodemailer');
const UserPlan= require('../models/UserPlan');
const Subscription=require('../models/Subscription');
const Sale = require('../models/Sale'); 

router.post('/checkout', async (req, res) => {
  
  try {
    let {cartItem}=req.body;
    let {userId}=req.body;
// const userId=req.cookies.userId;
   

console.log("User ID from cookies:", userId);


console.log("Cart Data from backend:", req.body);

let allFeatures = [];
let saleDiscount = 0;


    // Fetch all user plans for the current user
    const userPlans = await UserPlan.find({ user:userId });
    console.log("User Plans:", userPlans);

    

    // Collect all subscription IDs from the user plans
    const subscriptionIds = userPlans.map(plan => plan.subscription);
    console.log("Subscription IDs:", subscriptionIds);

    // Fetch all subscriptions based on the subscription IDs
    const subscriptions = await Subscription.find({ '_id': { $in: subscriptionIds } });
    console.log("Subscribed packages: ", subscriptions);
    const currentDate = new Date();
    const activeSale = await Sale.findOne({
      isActive: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    });
  
   
    if (activeSale) {
      saleDiscount = activeSale.discountPercentage || 0;
    }

    // Combine all features from all user plans' subscriptions
    
    subscriptions.forEach(subscription => {
      allFeatures = [...allFeatures, ...(subscription.features || [])]; // Merge features from each subscription
    });

    console.log("Combined Features:", allFeatures);

    // Now, you can apply features like free delivery, discounts, etc.

    // Check the features and apply them
    allFeatures.forEach(feature => {
      switch (feature) {
        case "free delivery":
          deliveryFee = 0; // Set delivery fee to 0 if free delivery is included
          break;
        case "10% off":
          // Apply 10% discount logic here
          break;
        // Add more features as needed
        default:
          break;
      }
    });
    // Check Stock Availability
    // Ensure cartItem is an array
// if (!Array.isArray(cartItem) || cartItem.length === 0) {
//   return res.status(400).json({ message: 'Invalid or empty cart' });
// }

// Loop through each item and validate
for (const [index,item] of Object.entries(cartItem)) {
  const product = await Product.findById(index);
  if (!product) {
    return res.status(404).json({ message: `Product not found: ${index}` });
  }

  if (product.quantity < item.quantity) {
    return res.status(400).json({ message: `Insufficient stock for ${product.name}.Only ${product.quantity} ${product.name} is in stock` });
  }
}


    // Create Order
    

   
  
    return res.status(200).json({message:"OK",features:allFeatures,saleDiscount: saleDiscount});

    // Send Confirmation Email
   
  } catch (err) {
    console.error("Error details:", err);
    return res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});



module.exports = router;
