import dotenv from 'dotenv';
dotenv.config({"path":"./.env"})
import ConnectDB from './Database/index.js';
import app from './app.js';

ConnectDB().then(() => {

    app.listen( process.env.PORT || 4000, () => {
      console.log(`Server running at port ${process.env.PORT || 4000}`);
    });
  }) .catch((error) => {
    console.log(
      {"MongoDB Error " : error.errors,
      "Mongo DB Status Code " : error.statusCode, }
   ); // here we have used api error class to handle error
    
  });
  
  
  
  app.on("error", (error) => {
    console.log("Server Errors :", error);
  });