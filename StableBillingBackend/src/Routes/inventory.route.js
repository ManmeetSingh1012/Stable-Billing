import { Router } from "express";

import { verifyJWT } from "../Middlewares/verifyToken.middleware.js";
import {
	add,
	get,
	deletedata,
	update,
	updatequantity,
} from "../Controllers/inventory.controller.js";
import LowStock from "../Controllers/lowstock.controller.js";

const inventory = Router();

inventory.route("/addinventory").post(verifyJWT, add);
inventory.route("/updateinventory/:id").put(verifyJWT, update);
inventory.route("/updateinventoryqty/:id").put(verifyJWT, updatequantity);
inventory.route("/deleteinventory/:id").delete(verifyJWT, deletedata);
inventory.route("/getinventory").get(verifyJWT, get);
inventory.route("/getlowstock").get(LowStock);

export default inventory;
