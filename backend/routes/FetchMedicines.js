const express=require('express');
const router=express.Router();
const Product=require('../models/Products');


router.post('/Medicines',async (req,res)=>{
 const product=await Product.find({Pro_category:"Medicine"});
 
    console.log("Medicine: ",product);

    if(product){
        return res.status(200).json({data:product});
    }
    else{

        return res.status(404).json({message:"No medicine Found"});

    }

});

module.exports=router;