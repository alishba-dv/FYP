const express=require("express");
const router=express();
const Products = require('../models/Products'); // Assuming you have a Product model defined




router.get("admin/List", async (req, res) => {
    try {
        const products = await Products.find({});
        const modifiedProducts = products.map((prod) => ({
            ...prod._doc,
            image: prod.image ? `data:image/png;base64,${prod.image.toString("base64")}` : null,
        }));
        res.json(modifiedProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});


module.exports=router;