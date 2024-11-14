import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// middleware for cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// middleware for json data
app.use(
  express.json({
    limit: "5mb",
  })
);

// cookie parser
app.use(cookieParser());

// middleware for url data
app.use(express.urlencoded({ extended: true }));

// middleware for static files
app.use(express.static("temp"));


import pdfroute from "./routes/pdfroute.js";

app.use("/api/v1/pdf",pdfroute)


app.use("/test",(req,res)=>{
    res.json({message:"Notification Service is working fine"})
})

export default app;
