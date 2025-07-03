const express=require("express");
const router=express.Router();
const Order=require("../models/Order");
const {authMiddleware}=require("../middlewares/authMiddleware");



router.post("/Orders",authMiddleware,async(req,res)=>{

try{

    const ordersDb=await Order.find({});
    console.log("Orders: ",ordersDb);
    if(ordersDb){

        console.log(ordersDb.orders);
        return res.status(200).json({message:"Orders Found",data:ordersDb});

    }

    else{
        return res.status(400).json({message:"Orders Not Found"});

    }

}
catch(err){
    return res.status(500).json({message:"Internal Server Error"});
}

});

module.exports=router;