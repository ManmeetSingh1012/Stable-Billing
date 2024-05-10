import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";


import { addparties , getparties, updateparties , deleteparties } from "../Controllers/parties.controller.js";


const parties = Router();

parties.route("/addparties").post(verifyJWT,addparties)
parties.route("/getparties").get(verifyJWT,getparties)
parties.route("/updateparties/:id").put(verifyJWT,updateparties)
parties.route("/deleteparties/:id").delete(verifyJWT,deleteparties)



export default parties;