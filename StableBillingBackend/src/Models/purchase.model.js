import mongoose from "mongoose";


const purchase = mongoose.Schema({

   productname:{
      type : String,
      required : true
   },

   productid:{
      type : String,
      required : true
   },

   totalprice:{
      type : Number,
      required : true
   },

   quantity:{
      type : Number,
      required : true
   },

   withwhom:{
      type : String,
      required : true
   },

   paymentstatus:{
      type : String,
      required : true,
      enum : ["pending","completed"]
   
   }

   ,

   user :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required : true
   }

   


},{timestamps:true})


export const Purchase = mongoose.model("Purchase",purchase)