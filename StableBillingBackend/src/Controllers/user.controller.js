import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";
import { ApiError } from "../Utility/ApiError.js";
import { Register } from "../Models/register.model.js";


const genratetokens = async (userId) => {

   try {
      const user = await User.findById(userId)
      const acesstoken = user.genrateAcessToken()
      const refreshtoken = user.generateRefreshToken()

      user.refreshToken = refreshtoken
      user.acessToken = acesstoken

      // after changing the refreshtoken we need to save the user
      await user.save({ validateBeforeSave: false })

      return { acesstoken, refreshtoken }
   }
   catch (error) {
      throw new ApiError(500, String(error.message))
   }


}

const signup = async (req, res, next) => {
   try {

      const { username, email, password ,premium } = req.body;

      console.log(req.body)

      if (username == "") {
         res.status(400).json({
            success: false,
            message: "username is empty"
         })

         //throw new ApiError(400, "username is empty")
         return;
      }

      else if (email == "") {
         res.status(400).json({
            success: false,
            message: "email is empty"
         })

         //throw new ApiError(400, "email is empty")
         return;
      }

      else if (password == "") {
         res.status(400).json({
            success: false,
            message: "password is empty"
         })

         //throw new ApiError(400, "password is empty")
         return;
      }


      const user_name = await User.findOne({
         username: username
      })

      const user_email = await User.findOne({

         email: email

      })

      if (user_name || user_email) {
         res.status(400).json({
            message: "this username or email already exists"
         })

         console.log("username or email  already exists")

        // throw new ApiError(400, "username already exists")
         return;
      }

      const newuser = await User.create({
         username,
         email,
         password,
         premium
      })

      if (newuser) {

         const { acesstoken, refreshtoken } = await genratetokens(newuser._id)

         // fetching updated data
         const user = await User.findById(newuser._id).select("-password -refreshtoken")

         console.log("user created successfully", user)

         





         /*const options = {
            httpOnly: true,
            secure: true
         }
*/
         
         
         res.status(201)
            //.cookie("accessToken", acesstoken, options,{sameSite:"none"})
            //.cookie("refreshToken", refreshtoken, options,{sameSite:"none"})
            .json({
               success: true,
               message: "user created successfully",
               user: user
            })

            
         console.log("user created successfully", user)

      } else {
         res.json({
            success: false,
            message: "user not created-something went wrong",
            error: newuser
         })

         //throw new ApiError(400, "user not created-something went wrong")
      }


   } catch (error) {

      res.status(500).json({
         success: false,
         message: String(error.message)
      })

      throw new ApiError(500, String(error.message))
   }
}

const registerbusiness = async (req, res) => {

   try {


      const { businessname, businesstype, gstno, phoneno, address } = req.body;
      console.log(req.user)
      const userid = req.user._id;


      if (businessname == "") {
         res.status(400).json({
            success: false,
            message: "businessname is empty"
         })

         
         return;
      }

      else if (businesstype == "") {
         res.status(400).json({
            success: false,
            message: "businesstype is empty"
         })

         
         return;
      }

      else if (gstno == "") {
         res.status(400).json({
            success: false,
            message: "gstno is empty"
         })

         
         return;
      }


      else if (phoneno == "") {
         res.status(400).json({
            success: false,
            message: "phoneno is empty"
         })

        
         return;
      }

      else if (address == "") {
         res.status(400).json({
            success: false,
            message: "address is empty"
         })

        
         return;
      }


      const register = await Register.create({
         businessname,
         businesstype,
         gstno,
         phoneno,
         address,
         user: userid

      })


      if (register) {

      
         res.status(201)
            .json({
               success: true,
               message: "Business successfully Registered",
               user: register
            })
         

      } else {
         res.status(400).json({
            success: false,
            message: "Business  not created-something went wrong",
            
         })

         
      }
   }
   catch (error) {

      res.status(500).json({
         success: false,
         message: String(error.message)
      })

      throw new ApiError(500, String(error.message))
   }

}



const login = async (req, res, next) => {

   try {

      const { username, password } = req.body

      if (username == "") {
         res.status(400).json({
            success: false,
            message: "username is empty"
         })

         //throw new ApiError(400, "username is empty")
         return;
      }

      else if (password == "") {
         res.status(400).json({
            success: false,
            message: "password is empty"
         })

         //throw new ApiError(400, "password is empty")
         return;
      }

      const user = await User.findOne({ username: username })

      if (!user) {
         res.status(400).json({
            success: false,
            message: "invalid credentials"
         })

         //throw new ApiError(400, "user not found")
         return;
      }

      const isMatch = await user.isPasswordCorrect(password)

      if (!isMatch) {
         res.status(400).json({
            success: false,
            message: "invalid credentials"
         })

         //throw new ApiError(400, "invalid credentials")
         return;
      }

      const { acesstoken, refreshtoken } = await genratetokens(user._id)

      // fetching updated data
      const updateduser = await User.findById(user._id).select("-password -refreshtoken")

      console.log("user logged in successfully", updateduser)

      /*const options = {
         httpOnly: true,
         secure: true
      }*/

      res.status(200)
         /*.cookie("accessToken", acesstoken, options)
         .cookie("refreshToken", refreshtoken, options)*/
         .json({
            success: true,
            message: "user logged in successfully",
            user: updateduser
         })

      console.log("user logged in successfully", updateduser.data)

   } catch (error) {

      res.status(500).json({
         success: false,
         message: String(error.message)
      })

      throw new ApiError(500, String(error.message))
   }

}


const logout = async (req, res) => {
   try {

      await User.findByIdAndUpdate(
         req.user._id,
         {
            $set: {
               refreshToken: ""
            }
         },

         {
            new: true

         })

         

         const options = {
            httpOnly: true,
            secure: true
         }

      return res
         .status(200)
         .clearCookie("accessToken", options)
         .clearCookie("refreshToken", options)
         .json({
            status: 200,
            message: "User logged out successfully"

         })

   } catch (error) {

      res.status(500).json({
         success: false,
         message: String(error.message)
      })

      throw new ApiError(500, String(error.message))
   }
}

const currentuser = async (req, res, next) => {


   try {



      res.status(200).json({
         status: true,
         message: "current user",
         user: req.user
      })


   } catch (error) {

      res.status(500).json({
         success: false,
         message: String(error.message)
      })

      throw new ApiError(500, String(error.message))
   }

}




export { signup, registerbusiness, currentuser, login ,logout }