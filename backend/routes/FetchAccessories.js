const express=require("express");
const router=express.Router();
const Product=require("../models/Products");


router.post("/Accessories",async(req,res)=>{

    const product=await Product.find({Pro_category:"Accessories"});
    console.log("Accessories: ",product);

    if(product){
        return res.status(200).json({data:product});
    }
    else{

        return res.status(404).json({message:"No product Found"});

    }

});

module.exports=router;