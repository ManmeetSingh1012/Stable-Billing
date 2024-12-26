import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

export const verifyJWT = async (req, res, next) => {
	try {
		// this is the middle ware so the user will send the token in header(mobile device) or in cookie form
		console.log("check 1");
		const token = req.cookies?.accessToken;
		// || req.header("Authorization")?.replace("Bearer ", "");

		// console.log(token);

		console.log("check 1", token);

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized request",
			});
		}

		console.log("check 2");

		// this will decode the token and get the user id from the token
		console.log(`${process.env.ACCESS_TOKEN_SECRET}`);
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const user = await User.findById(decodedToken?._id).select(
			"-password -refreshToken"
		);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized request",
			});
		}

		req.user = user;
		// my work is finish u can move to other middleware
		next();
	} catch (error) {
		if (
			error.name === "JsonWebTokenError" ||
			error.name === "TokenExpiredError"
		) {
			return res.status(401).json({
				success: false,
				message: error.message || "Invalid access token",
			});
		}

		res.status(500).json({
			success: false,
			message: "An unexpected error occurred",
		});
	}
};
