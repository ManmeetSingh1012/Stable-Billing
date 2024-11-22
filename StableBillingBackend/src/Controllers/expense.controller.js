import { Expense } from "../Models/expense.model.js"
import { ApiError } from "../Utility/ApiError.js";
const add  = async (req,res)=>{

   try{
      const id = req.user._id

 
      const { 

         expensename , expenseamount , expensetype } = req.body;
         console.log("data2",req.body)
         if( expensename == "" || expenseamount == "" || expensetype == "" ) {
            res.status(400).json({
               success: false,
               message: "All fields are required"
            })
      
            throw new ApiError(400, "All fields are required")
            return;
      
         }

         console.log("data",req.body)
   
   
         const data = await Expense.create({
            expensename,
            expenseamount,
            expensetype,

            user : id
            
         
         })

         console.log("data2",data)
   

         if (data) {
            res.status(200).json({
               success: true,
               message: "Expense added successfully",
               data: data
            })
         } else {
   
            res.status(400).json({
               success: false,
               message: "Failed to add Expense"
            })
   
            throw new ApiError(400, "Failed to add Expense", err)
         }
   }catch (err) {
      console.log("error",err)
      res.status(500).json({
         success: false,
         message: "Internal server error"
      })
      throw new ApiError(500, "Internal server error", err)
   }


}

const get  = async (req,res)=>{

   try {

      

      const id = req.user._id

      const data = await Expense.find({ user: id })

      if (data.length > 0) {


         res.status(200).json({
            status: true,
            message: "Expense fetched successfully",
            data: data
         })

         
         console.log(data)
      } else {

         res.status(400).json({
            status: false,
            message: "No Expense found",
            "data": {}
         })


         // throw new ApiError(400, "No parties found")
      }
   } catch (err) {
      console.log(err)
      res.status(500).json({
         success: false,
         message: "Internal server error Expense"
      })
      throw new ApiError(500, "Internal server error", err)
   }

}

const deletexpense  = async (req,res)=>{

   try{
      const expenseid = req.params.id;
      const deletedProduct = await Expense.findByIdAndDelete(expenseid);
      
      if (!deletedProduct) {
          return res.status(404).json({ error: 'Expense not found' });
      }
      
      res.status(200).json({ message: 'Expense deleted successfully' });

   }catch(err)
   {
      console.log(err)
      res.status(500).json({
         success: false,
         message: "Internal server error"
      })
      throw new ApiError(500, "Internal server error", err)
   }
}



const update  = async (req,res)=>{

   try{

      const id = req.params.id;
      const { 

         expensename , expenseamount , expensetype } = req.body;
         console.log("data2",req.body)
         if( expensename == "" || expenseamount == "" || expensetype == "" ) {
            res.status(400).json({
               success: false,
               message: "All fields are required"
            })
      
            throw new ApiError(400, "All fields are required")
            return;
      
         }

   const data = await Expense.findByIdAndUpdate(id,{
      expensename,
      expenseamount,
      expensetype
      
   
   },{new:true})

   if(!data){
      res.status(400).json({
         success: false,
         message: "Expense not found"
      })
   }else{
      res.status(200).json({
         success: true,
         message: "Expense updated!",
       });
   }

   

   }catch (err) {

      console.log(err)

      res.status(500).json({
         success: false,
         message: "Internal server error"
      })

      throw new ApiError(500, "Internal server error", err)
   }

}

export {add,get,deletexpense,update}