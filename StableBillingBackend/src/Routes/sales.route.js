import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { addSale, updateSale, deleteSale,getSale } from "../Controllers/sale.controller.js";


const sales = Router();

sales.use(verifyJWT)
sales.route("/addsale").post(addSale)
sales.route("/getsale").get(getSale)
sales.route("/deletesale/:id").delete(deleteSale)
sales.route("/updatesale/:id").put(updateSale)


export default sales;