import { Router } from "express";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { add ,get , deletedata, update , updatequantity} from "../Controllers/inventory.controller.js";


const inventory = Router();
inventory.use(verifyJWT)
inventory.route('/addinventory').post(add)
inventory.route('/updateinventory/:id').put(update)
inventory.route('/updateinventoryqty/:id').put(updatequantity)
inventory.route('/deleteinventory/:id').delete(deletedata)
inventory.route('/getinventory').get(get)

export default inventory;