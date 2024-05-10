import jwt from "jsonwebtoken"
import { User } from "../Models/user.model.js"
import { ApiError } from "../utility/ApiError.js"  

export const verifyJWT = (async(req, res, next) => {
   try {
    
      // this is the middle ware so the user will send the token in header(mobile device) or in cookie form 
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
       
       // console.log(token);

       if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized request"
        })
           
           throw new ApiError(401, "Unauthorized request")
           
           
       }
       
       // this will decode the token and get the user id from the token
       console.log(`${process.env.ACESS_TOKEN_SECRET}`)
       const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET)
   
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
   
       if (!user) {
           
           throw new ApiError(401, "Invalid Access Token")
       }
   
       req.user = user;
       // my work is finish u can move to other middleware
       next()
   } catch (error) {
    res.status(400).json({
        status : false,
        message:error.message
    })
       throw new ApiError(401, error?.message || "Invalid access token")
       
   }
   
})