
import { Parties } from "../Models/parties.model.js"
import { ApiError } from "../Utility/ApiError.js"

const updateparties = async (req, res) => {

   const id = req.params.id;
   const { name, email, contact, gstno, address, balance, type } = req.body;

   if (name == "" || email == "" || contact == "" || gstno == "" || address == "" || balance == "" || type == "") {
      res.status(400).json({
         success: false,
         message: "All fields are required"
      })

      throw new ApiError(400, "All fields are required")
      return;

   }

   const data = await Parties.findByIdAndUpdate(id,{
      name,
      email,
      contact,
      gstno,
      address,
      balance,
      type
   
   },{new:true})

   res.status(200).json({
      success: true,
      message: "Job updated!",
    });


}

const deleteparties = async (req, res) => {

   try {
      const productId = req.params.id;
      const deletedProduct = await Parties.findByIdAndDelete(productId);
      
      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }
      
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
  }
  

}


const getparties = async (req, res) => {

   try {

      const userid = req.user._id;

      const parties = await Parties.find({ user: userid })

      console.log("length",parties.length)
      if (parties.length > 0) {
         

         res.status(200).json({
            status: true,
            message: "Parties fetched successfully",
            data: parties
         })

         console.log(parties)
      } else {

         res.status(400).json({
            status: false,
            message: "No parties found",
            "data":{}
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

const addparties = async (req, res) => {

   try {
      const { name, email, contact, gstno, address, balance, type } = req.body;

      if (name == "" || email == "" || contact == "" || gstno == "" || address == "" || balance == "" || type == "") {
         res.status(400).json({
            success: false,
            message: "All fields are required"
         })
         return;
      }

      const userid = req.user._id;

      const parties = await Parties.create({
         name,
         email,
         contact,
         balance,
         type,
         user: userid

      })

      if (parties) {
         res.status(200).json({
            success: true,
            message: "Parties added successfully",
            data: parties
         })
      } else {

         res.status(400).json({
            success: false,
            message: "Failed to add parties"
         })

         throw new ApiError(400, "Failed to add parties", err)
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


export  { addparties, getparties, updateparties, deleteparties }