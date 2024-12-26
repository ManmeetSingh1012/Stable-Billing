import { Router } from "express";
import { verifyJWT } from "../Middlewares/verifyToken.middleware.js";
import {
	add,
	update,
	deletexpense,
	get,
} from "../Controllers/expense.controller.js";

const expense = Router();

expense.use(verifyJWT);

expense
	.route("/")
	.post(add) // Create expense
	.get(get); // Get all expenses

expense
	.route("/:id")
	.put(update) // Update an expense
	.delete(deletexpense); // Delete an expense

export default expense;
