const express=require("express");
const router=express.Router();
const Order=require("../models/Order");
const {authMiddleware}=require("../middlewares/authMiddleware")


router.post("/orderFetch",authMiddleware,async(req,res)=>{

    const email=req.cookies.curr_userEmail;
    console.log("Current user mail at orderfetch ",email);

    if(!email){
        return res.status(400).json({error:"Email is required"});
    }

    else{
    const orderDetails=await Order.find({email:email});
    if(!orderDetails){
        return res.status(400).json({error:"No order details found"});
    }
    console.log(orderDetails);
    return res.status(200).json({orderDetails});
    }



})

module.exports=router;