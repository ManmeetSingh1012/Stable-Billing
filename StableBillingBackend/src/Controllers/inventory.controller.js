import { Inventory } from "../Models/inventory.model.js"
import { ApiError } from "../utility/ApiError.js"

const update = async () => {

   try{

      const id = req.params.id;
   const { 
      productname, quantity , productid , unitprice , minstock } = req.body;

   if(productname == "" || quantity == "" || productid == "" || unitprice == "" || minstock == "" ) {
      res.status(400).json({
         success: false,
         message: "All fields are required"
      })

      throw new ApiError(400, "All fields are required")
      return;

   }

   const data = await Inventory.findByIdAndUpdate(id,{
      productname,
      quantity,
      productid,
      unitprice,
      minstock,
      
   
   },{new:true})

   res.status(200).json({
      success: true,
      message: "Job updated!",
    });

   }catch (err) {

      console.log(err)

      res.status(500).json({
         success: false,
         message: "Internal server error"
      })

      throw new ApiError(500, "Internal server error", err)
   }
}


const get = async (req, res) => {

   try {

      const id = req.user._id

      const data = await Inventory.find({ user: id })

      if (data.length > 0) {


         res.status(200).json({
            status: true,
            message: "Parties fetched successfully",
            data: data
         })

         
         console.log(data)
      } else {

         res.status(400).json({
            status: false,
            message: "No parties found",
            "data": {}
         })


         // throw new ApiError(400, "No parties found")
      }
   } catch (err) {
      console.log(err)
      res.status(500).json({
         success: false,
         message: "Internal server error"
      })
      throw new ApiError(500, "Internal server error", err)
   }

}


const deletedata = async (req,res)=>{

   try{
      const productId = req.params.id;
      const deletedProduct = await Inventory.findByIdAndDelete(productId);
      
      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }
      
      res.status(200).json({ message: 'Product deleted successfully' });

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


const add = async(req,res)=>{

   try{
      const id = req.user._id

      const { 
         productname, quantity , productid , unitprice , minstock } = req.body;
   
         if(productname == "" || quantity == "" || productid == "" || unitprice == "" || minstock == "" ) {
            res.status(400).json({
               success: false,
               message: "All fields are required"
            })
      
            throw new ApiError(400, "All fields are required")
            return;
      
         }

         console.log("data",req.body)
   
   
         const data = await Inventory.create({
            productname,
            quantity,
            productid,
            unitprice,
            minstock,
            user : id
            
         
         })

         console.log("data2",data)
   

         if (data) {
            res.status(200).json({
               success: true,
               message: "Parties added successfully",
               data: data
            })
         } else {
   
            res.status(400).json({
               success: false,
               message: "Failed to add parties"
            })
   
            throw new ApiError(400, "Failed to add parties", err)
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


export {add,deletedata,update,get}