import { ApiError } from "../utility/ApiError.js";
import {Sale} from "../Models/sale.model.js";


const addSale = async (req,res,next) => { 

   try{
       
      const {productname, productid, totalprice, quantity, towhom, paymentstatus} = req.body;

      if(!productname || !productid || !totalprice || !quantity || !towhom || !paymentstatus)
      {
         res.status(400).json({
            message : "Please provide all fields",
            success : false
         })
         return;
      }

      const newSale =  await Sale.create({
         productname,
         productid,
         totalprice,
         quantity,
         towhom,
         paymentstatus,
         user : req.user._id

      })

      if(newSale)
      {
         res.status(200).json({
            message : "sale added successfully",
            success : true,
            data : newSale
         })
      }else{
         res.status(400).json({
            message : "Failed to add sale",
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

const getSale = async (req,res,next) => {

   try{

      const findSale = await Sale.find({user : req.user._id}).populate("user");

      if(findSale.length > 0)
      {
         res.status(200).json({
            message : "sale fetched successfully",
            success : true,
            data : findSale
         })
      }else{
         res.status(200).json({
            message : "No sale found",
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

const deleteSale = async (req,res,next) => {

   try {
      const doc_id = req.params.id;

      const findSale = await Sale.findById(doc_id);

      if(!findSale)
      {
         res.status(400).json({ 
            message : "No sale found with this id",
            success : false
         })
         return;
      }

      const deleteSale = await Sale.findByIdAndDelete(doc_id);

      if(deleteSale)
      {
         res.status(200).json({
            message : "sale deleted successfully",
            success : true
         })
      }else{
         res.status(400).json({
            message : "Failed to delete sale",
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


const updateSale = async (req,res,next) => {

   try{

      const doc_id = req.params.id;

      console.log("id",doc_id)

      const findSale = await Sale.findById(doc_id);

      if(!findSale)
      {
         res.status(400).json({ 
            message : "No sale found with this id",
            success : false
         })
         return;
      }

      const {productname, productid, totalprice, quantity, towhom, paymentstatus} = req.body;

      const updatesales = await Sale.findByIdAndUpdate(doc_id,{
         $set: {
         productname,
         productid,
         totalprice,
         quantity,
         towhom,
         paymentstatus}
      },{new : true})

      if(updatesales)
      {
         res.status(200).json({
            message : "sale updated successfully",
            success : true,
            data : updatesales
         })
      }else{
         res.status(400).json({
            message : "sale to update purchase",
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

export { addSale, getSale, deleteSale, updateSale }