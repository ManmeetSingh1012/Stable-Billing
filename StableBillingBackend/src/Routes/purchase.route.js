import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { addpurchase, deletepurchase, getpurchase, updatepurchase } from "../Controllers/purchase.controller.js";




const purchase = Router();
purchase.use(verifyJWT)
purchase.route("/addpurchase").post(addpurchase)
purchase.route("/getpurchase").get(getpurchase)
purchase.route("/deletepurchase/:id").delete(deletepurchase)
purchase.route("/updatepurchase/:id").put(updatepurchase)



export default purchase;