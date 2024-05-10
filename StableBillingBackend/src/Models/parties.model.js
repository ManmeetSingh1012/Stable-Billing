import mongoose from "mongoose";


const parties = new mongoose.Schema({

      name: {
         type: String,
         required: true
      },
      contact: {
         type: Number,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      
   

      balance: {
         type: Number,
         required: true
      },
      type:{
         type:String,
         required:true
      },

      
      user : {
         type: mongoose.Schema.Types.ObjectId,
         ref : "User",
         index :true
      }
      
      

},{timestamps:true})


export const Parties = mongoose.model("Parties",parties)