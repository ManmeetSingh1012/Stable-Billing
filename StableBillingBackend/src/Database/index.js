import mongoose from "mongoose";
import {ApiError} from "../Utility/ApiError.js";



const ConnectDB = () => {

   return new Promise(async(resolve,reject) =>{
      try{
         const connectionInstance = await mongoose.connect(`${process.env.Mongodb_url}`);
         console.log('Connected to DB', connectionInstance.connection.host);
         resolve();
      }catch(error){
         const errors = new ApiError(500, "Database Connection Error", error);
         reject(error);
      }

   })

   

}


export default ConnectDB;