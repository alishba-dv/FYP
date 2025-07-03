const express=require("express");
const router=express.Router();
const AdoptionForm=require("../models/PetAdoptionForm");
const {authMiddleware}=require('../middlewares/authMiddleware')

router.post('/getadoptionforms',authMiddleware,async (req,res)=>{


try{
  
        const allforms=await AdoptionForm.find();
        // console.log("PET IMAGES URL: :",allforms[0].PetImage)

        console.log("ALL forms: ",allforms);
        if(allforms){
        res.status(200).json({allforms})}
        

        else{
         res.status(404).json({message:"No record found"})}

       }


catch(err){
    console.log(err);
    res.status(404).json({message:"Error finding data.Try again later"});
}

});



router.get('/getapprovedadoptionforms',async (req,res)=>{


try{
  
        const allforms=await AdoptionForm.find({Status:"Approved"});
        // console.log("PET IMAGES URL: :",allforms[0].PetImage)

        console.log("ALL forms: ",allforms);
        if(allforms){
        res.status(200).json({allforms})}
        

        else{
         res.status(404).json({message:"No record found"})}

       }


catch(err){
    console.log(err);
    res.status(404).json({message:"Error finding data.Try again later"});
}

});

<<<<<<< HEAD

router.get('/getmyadoptionforms',async (req,res)=>{


try{
  const email=req.cookies.curr_userEmail;

        const allforms=await AdoptionForm.find({email:email});
        // console.log("PET IMAGES URL: :",allforms[0].PetImage)

        console.log("ALL forms: ",allforms);
        if(allforms){
        res.status(200).json({allforms})}
        

        else{
         res.status(404).json({message:"No record found"})}

       }


catch(err){
    console.log(err);
    res.status(404).json({message:"Error finding data.Try again later"});
}



});


router.get('/unpublish',async (req,res)=>{

  const petId = req.query.Id;  

  try {
    const deletedAd = await AdoptionForm.findByIdAndDelete(petId);

    if (!deletedAd) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    res.status(200).json({ message: 'Ad unpublished successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    res.status(500).json({ message: 'Server error' });
  }

}
);



=======
>>>>>>> 90cd219c228b5a0141eeb0d030ff8eca3a3897ad
module.exports=router;