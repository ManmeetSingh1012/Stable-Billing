import mongoose from "mongoose";


const expense = new mongoose.Schema({ 


   expensename:{
      type:String,
         required:true,
         index:true
   
   },

   expenseamount:{
      type:Number,
         required:true
   },

   expensedate:{
      type:Date,
        
         default:Date.now()
   },

   expensetype:{
      type:String,
         required:true,
         enum:["salary","utility","marketing","maintenance","other"]
   },

   user : {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",
      index :true
   }

}
   
   ,{timestamps:true})

   export const Expense = mongoose.model("Expense",expense)