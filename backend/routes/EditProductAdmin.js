const express = require('express');
const router = express.Router();
const Product=require('../models/Products');
const {authMiddleware}=require('../middlewares/authMiddleware')


router.post('/updateProduct',authMiddleware,async(req,res)=>{

        const { pid, productDetails } = req.body;

    console.log("P id: ",pid);

     const pFound=await Product.find({_id:pid});
    if(pFound){
        console.log("Product Found");

        if(productDetails.quantity<=0 ){
            return res.status(400).json({ message: 'Quantity must be at least 1." ' });
        }

 if(productDetails.price<1 ){
            return res.status(400).json({ message: 'Price must be greater than zero ' });
        }
        const updateProduct=await Product.updateOne({_id:pid},{$set:productDetails});
       if( updateProduct){
        console.log("Product Updated");
        return res.status(200).json({message:"Product Updated Successfully"});

       }
       else{
        console.log("Product not Updated");
            return res.status(401).json({message:"NOt updated"});

       }
    }
    else if(!pFound){ 
        console.log("No product Found");
         return res.status(404).json({message:"Not found"});

    }
    else
        return res.status(500).json({message:"Internal server error"});





});

module.exports=router;