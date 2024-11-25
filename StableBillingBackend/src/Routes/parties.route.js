import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";


import { addparties , getparties, updateparties , deleteparties } from "../Controllers/parties.controller.js";


const parties = Router();
parties.use(verifyJWT)
parties.route("/addparties").post(addparties)
parties.route("/getparties").get(getparties)
parties.route("/updateparties/:id").put(updateparties)
parties.route("/deleteparties/:id").delete(deleteparties)



export default parties;