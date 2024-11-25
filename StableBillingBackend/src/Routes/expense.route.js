import { Router } from "express";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { add ,update , deletexpense , get } from "../Controllers/expense.controller.js";


const expense = Router();
expense.use(verifyJWT)
expense.route('/addexpense').post(add)
expense.route('/updatexpense/:id').put(update)
expense.route('/deletexpense/:id').delete(deletexpense)
expense.route('/getexpense').get(get)

export default expense;