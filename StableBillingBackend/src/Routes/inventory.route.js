import { Router } from "express";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { add ,get , deletedata, update } from "../Controllers/inventory.controller.js";


const inventory = Router();

inventory.route('/addinventory').post(verifyJWT,add)
inventory.route('/updateinventory/:id').put(verifyJWT,update)
inventory.route('/deleteinventory/:id').delete(verifyJWT,deletedata)
inventory.route('/getinventory').get(verifyJWT,get)

export default inventory;