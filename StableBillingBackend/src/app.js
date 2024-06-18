import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();



// middleware for cors
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true

}))

// middleware for json data
app.use(express.json({
   limit: "5mb"
}))

// cookie parser
app.use(cookieParser())

// middleware for url data
app.use(express.urlencoded({ extended: true  }))

// middleware for static files
app.use(express.static("temp"))


// Routes :-
import router from "./Routes/root.route.js";
import userrouter from "./Routes/user.route.js";

import inventory from "./Routes/inventory.route.js";
import sales from "./Routes/sales.route.js";
import purchase from "./Routes/purchase.route.js";
import parties from "./Routes/parties.route.js"
import expense from "./Routes/expense.route.js";

app.use("/api/v1", router)
app.use("/api/v1/user",userrouter)

app.use("/api/v1/inventory",inventory)
app.use("/api/v1/parties",parties)
app.use("/api/v1/sale",sales)
app.use("/api/v1/purchase",purchase)
app.use("/api/v1/expense",expense)



export default app;