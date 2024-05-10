import mongoose from "mongoose";


const inventory = new mongoose.Schema({

   productname:{

      type:String,
         required:true
   },

   quantity:{

      type:Number,
         required:true
   }
   ,

   productid:{
      type:String,
         required:true

   },

   unitprice:{

      type:Number,
         required:true

   }

   ,
   minstock:{

      type:Number,
         required:true


   },

   user : {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",
      index :true
   }
   
},{timestamps:true})

export const Inventory = mongoose.model("Inventory",inventory)