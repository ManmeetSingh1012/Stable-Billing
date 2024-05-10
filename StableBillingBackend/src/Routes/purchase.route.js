import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { addpurchase, deletepurchase, getpurchase, updatepurchase } from "../Controllers/purchase.controller.js";



const purchase = Router();

purchase.route("/addpurchase").post(verifyJWT,addpurchase)
purchase.route("/getpurchase").get(verifyJWT,getpurchase)
purchase.route("/deletepurchase/:id").delete(verifyJWT,deletepurchase)
purchase.route("/updatepurchase/:id").put(verifyJWT,updatepurchase)



export default purchase;