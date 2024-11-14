import mongoose from "mongoose";



const connectDB = ()=>{

    return new Promise(async(resolve,reject) =>{

        try {
            const connectionInstance = await mongoose.connect(`${process.env.Mongodb_url}`);
            console.log('Connected to DB', connectionInstance.connection.host);
            resolve();
        }catch(error){
            reject(error);
        }

    })
}

export default connectDB;