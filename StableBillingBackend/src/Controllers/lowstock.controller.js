import { Inventory } from "../Models/inventory.model.js";

export const LowStock = async (req, res) => {
	try {
		//expr use to compare 2 fields in same document
		const response = await Inventory.find({
			$expr: { $lte: ["$quantity", "$minstock"] }, // Compare quantity with minstock dynamically
		}).populate({
			path: "user",
			select: "username email",
		});

		console.log("Low Stock Response", response);

		res.status(200).json({
			status: "success",
			lowstock: response,
		});
	} catch (error) {
		console.log("Error in LowStock Controller", error);
		res.status(400).json({
			status: "false",
		});
	}
};

export default LowStock;
