import { Router } from "express";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { add ,update , deletexpense , get } from "../Controllers/expense.controller.js";


const expense = Router();

expense.route('/addexpense').post(verifyJWT,add)
expense.route('/updatexpense/:id').put(verifyJWT,update)
expense.route('/deletexpense/:id').delete(verifyJWT,deletexpense)
expense.route('/getexpense').get(verifyJWT,get)

export default expense;