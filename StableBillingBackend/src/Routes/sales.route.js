import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { addSale, updateSale, deleteSale,getSale } from "../Controllers/sale.controller.js";


const sales = Router();


sales.route("/addsale").post(verifyJWT,addSale)
sales.route("/getsale").get(verifyJWT,getSale)
sales.route("/deletesale/:id").delete(verifyJWT,deleteSale)
sales.route("/updatesale/:id").put(verifyJWT,updateSale)


export default sales;