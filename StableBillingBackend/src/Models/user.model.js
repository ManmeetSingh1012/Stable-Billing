import { timeStamp } from "console";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const user = new mongoose.Schema({

   username:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      index:true
   },

   email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      
   },


   premium:{
      type:Boolean,
      required:true,
   },
   

   
   password:{
      type:String,
      required:true
   },
   refreshToken: {
      type: String
   }
   ,

   acessToken: {
      type: String
   }
   

   

   

},{timestamps:true})


// pre middleware
user.pre("save", async function(next)
{
   if(this.isModified("password"))
   {
      this.password = await bcrypt.hash(this.password,12)
   }
   next()
})

user.methods.isPasswordCorrect = async function(password)
{
   return await bcrypt.compare(password,this.password)
}


user.methods.genrateAcessToken = function () {

 
   
   return jwt.sign(
      {
         _id : this._id ,
         email : this.email,
         username : this.username,
         fullname : this.fullname
      },
      process.env.ACESS_TOKEN_SECRET
      ,{
         expiresIn : process.env.ACESS_TOKEN_EXPIREY
      }
   )

   

}


user.methods.generateRefreshToken = function () {

   return jwt.sign(
      {
         _id : this._id 
      },
      process.env.REFRESH_TOKEN
      ,{
         expiresIn : process.env.REFRESH_TOKEN_EXPIREY
      }
   )
}

export  const User = mongoose.model("User",user)