const express = require('express');
const router = express.Router();
const Product = require('../models/Products'); // Import User model
const Sale=require('../models/Sale'); // Import Sale model


router.post("/collection", async (req, res) => {


    try {
        const productsfromDb = await Product.find({ "Pro_category": "Food Product" });
        if (productsfromDb.length > 0) {
            console.log("Products found");
        } else {
            console.log("No products found");
        }
        res.status(200).json({ data: productsfromDb });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/getsale", async (req, res) => {
    try {
      const currentDate = new Date();
  
      const activeSale = await Sale.findOne({
        isActive: true,
        // startDate: { $lte: currentDate },
        endDate: { $gte: currentDate }
      });
  console.log(activeSale);
      if (activeSale) {
        res.json({
            discountPercentage: activeSale.discountPercentage,
          isActive: true,endDate: activeSale.endDate
        });
        console.log(("Active sale found:", activeSale.discountPercentage));
      } else {
        res.json({ isActive: false });
      }
    } catch (error) {
      console.error("Error fetching sale:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
