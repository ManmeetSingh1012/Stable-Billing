import { ApiError } from "../utility/ApiError.js";
import { Purchase } from "../Models/purchase.model.js";


const addpurchase = async (req,res,next) => { 

   try{
       
      const {productname, productid, totalprice, quantity, withwhom, paymentstatus} = req.body;

      if(productname  =="" || productid == "" || totalprice =="" || quantity == "" || withwhom == "" || paymentstatus == "")
      {
         res.status(400).json({
            message : "Please provide all fields",
            success : false
         })
         return;
      }

      const newpurchase = await  Purchase.create({
         productname,
         productid,
         totalprice,
         quantity,
         withwhom,
         paymentstatus,
         user : req.user._id

      })

      console.log("purcahse",newpurchase)

      if(newpurchase)
      {
         res.status(200).json({
            message : "Purchase added successfully",
            success : true,
            data : newpurchase
         })
      }else{
         res.status(400).json({
            message : "Failed to add purchase",
            success : false
         })
         return;
      
      }
   }catch(error)
   {
      res.status(500).json({
         message : "Internal server error",
         success : false,
         data: error.message
      })

      throw new ApiError(error.message,500)
   }
}

const getpurchase = async (req,res,next) => {

   try{

      const findpurchase = await Purchase.find({user : req.user._id}).populate("user");

      if(findpurchase.length > 0)
      {
         res.status(200).json({
            message : "Purchase fetched successfully",
            success : true,
            data : findpurchase
         })
      }else{
         res.status(200).json({
            message : "No purchase found",
            success : true,
            data : []
         })
      }

   }catch(
      error
   )
   {
      res.status(500).json({
         message : "Internal server error",
         success : false,
         data: error.message
      })

      throw new ApiError(error.message,500)
   }
 }

const deletepurchase = async (req,res,next) => {

   try {
      const doc_id = req.params.id;

      const findpurchase = await Purchase.findById(doc_id);

      if(!findpurchase)
      {
         res.status(400).json({ 
            message : "No purchase found with this id",
            success : false
         })
         return;
      }

      const deletepurchase = await Purchase.findByIdAndDelete(doc_id);

      if(deletepurchase)
      {
         res.status(200).json({
            message : "Purchase deleted successfully",
            success : true
         })
      }else{
         res.status(400).json({
            message : "Failed to delete purchase",
            success : false
         })
         return;
      }

      
   }catch(
      error
   )
   {
      res.status(500).json({
         message : "Internal server error",
         success : false,
         data: error.message
      })

      throw new ApiError(error.message,500)
   }
 }

const updatepurchase = async (req,res,next) => {

   try{

      const doc_id = req.params.id;

      const findpurchase = await Purchase.findById(doc_id);

      if(!findpurchase)
      {
         res.status(400).json({ 
            message : "No purchase found with this id",
            success : false
         })
         return;
      }

      const {productname, productid, totalprice, quantity, withwhom, paymentstatus} = req.body;

      const updatepurchase = await Purchase.findByIdAndUpdate(doc_id,{
         $set: {
         productname,
         productid,
         totalprice,
         quantity,
         withwhom,
         paymentstatus
         }
      },{new : true})

      if(updatepurchase)
      {
         res.status(200).json({
            message : "Purchase updated successfully",
            success : true,
            data : updatepurchase
         })
      }else{
         res.status(400).json({
            message : "Failed to update purchase",
            success : false
         })
         return;
      }

   }catch(
      error
   )
   {
      res.status(500).json({
         message : "Internal server error",
         success : false,
         data: error.message
      })

      throw new ApiError(error.message,500)
   }
 }

export { addpurchase, getpurchase, deletepurchase, updatepurchase }