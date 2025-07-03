const express=require("express");
const router=express.Router();
const AdoptionForm=require("../models/PetAdoptionForm");
const {authMiddleware}=require('../middlewares/authMiddleware')

router.post('/approvepetrequest',authMiddleware,async (req,res)=>{
    const ID=req.body.ID;


try{
    const updated = await AdoptionForm.updateOne(
        { _id: ID },
        { $set: { Status: 'Approved' } }
    );

        console.log("updated forms: ",updated);
        if(updated){
        res.status(200).json({mesage:"Request approved "})}
        

        else{
         res.status(404).json({message:"No record found"})}

       }


catch(err){
    console.log(err);
    res.status(404).json({message:"Error finding data.Try again later"});
}

});

module.exports=router;