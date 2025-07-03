const mongoose=require("mongoose");

const AdoptionForm=new mongoose.Schema({
    CustomerName:{type:String,required:true},
     CustomerEmail:{type:String,required:true},
    CustomerAddress:{type:String,required:true},
    Phone:{type:String,required:true},
    PetName:{type:String},
    PetColor:{type:String,required:true},
    PetBreed:{type:String,required:true},
    PetType:{type:String,required:true},
    Age:{type:Number,required:true},
    Reason:{type:String,required:true},
    PetImage:{type:[String],required:true},
    Date:{type:Date,required:true},
    Status:{type:String,required:true}


});

module.exports=mongoose.model('AdoptionForm',AdoptionForm);