const express=require("express");
const router=express.Router();
const Products=require("../models/Products");
const {authMiddleware} = require("../middlewares/authMiddleware");


router.post("/List",authMiddleware,async(req,res)=>{

    try{
    const products=await Products.find({});
    if(products){
        
    return res.status(200).json({message:"Products found",data:products});

                }

    else{
        return res.status(400).json({message:"No product found"});
    }
}

    catch(err){
        return res.status(500).json({message:"Server error"});
    }

});

            module.exports=router;