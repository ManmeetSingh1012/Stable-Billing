import mongoose , {Schema} from "mongoose";



const register = new mongoose.Schema({


   businessname:{
      type:String,
      required:true,
      index:true


   },

   businesstype:{
      type:String,
      required:true
   },
   gstno:{
      type:String,
      required:true,
      index:true
   },

   phoneno:{
      type:Number,
      required:true,

   },
   

   address:{

      type:String,
      required:true
   },

   user : {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",
      index :true
   }

   

   
},{timeStamp:true})


export const Register = mongoose.model("Register",register)