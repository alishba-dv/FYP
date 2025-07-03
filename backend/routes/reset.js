const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const User = require('../models/User'); // Import User model
// const authtoken=require('../middlewares/authMiddleware');


router.post('/reset',async(req,res)=>{

  console.log("Request email: ",req.body.email);
    console.log("Request password: ",req.body.newpassword);

  const email=req.body.email;
  const newpassword=req.body.newpassword;


 const user= await User.findOne({email});
const hpass=  await bcrypt.hash(newpassword, 10);

 if(user){

   const updatedPass=await User.updateOne(
      { email: email }, // Match condition
      { $set: { password: newpassword,hashedP:hpass} } // Update data
    );

    if(updatedPass){
        console.log("Password updated")
         res.status(200).json({message:"Password updated successfully"});
    }
    else{
        return res.status(400).json({message:"Not updated"});
    }
 }

 else{
    return res.status(500).json({message:"user not found"});
 }

})

module.exports=router;