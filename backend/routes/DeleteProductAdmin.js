const express = require('express');
const router = express.Router();
const Product=require('../models/Products');
const {authMiddleware}=require('../middlewares/authMiddleware')


router.post('/deleteProduct', authMiddleware,async(req,res)=>{


    const p_id=req.body.pid;
    console.log(p_id);

    const pFound=await Product.find({_id:p_id});
    if(pFound){
        console.log("Produt Found");
        const deleteProd=await Product.deleteOne({_id:p_id})
       if( deleteProd){
        console.log("Product deleted");
        return res.status(200).json({message:"Product Deleted successfully"});

        // window.location.reload();
       }
       else{
        console.log("Product not deleted");
            return res.status(401).json({message:"Error deleting Product "});

       }
    }
    else{
        console.log("No product Found");
         return res.status(404).json({message:"No product found"});

    }
        return res.status(500).json({message:"Refresh the page"});





});


module.exports=router;