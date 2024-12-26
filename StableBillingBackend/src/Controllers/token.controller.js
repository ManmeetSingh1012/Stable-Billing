import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

const refreshToken = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		// Check if the refresh token is provided
		if (!refreshToken) {
			return res.status(403).json({
				message: "Credentials are not provided, login again",
			});
		}

		// Verify the refresh token
		const decodeToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

		// Find the user associated with the token
		const user = await User.findById(decodeToken._id);

		if (!user) {
			return res.status(403).json({
				message: "Token is invalid or expired",
			});
		}

		// Generate a new access token
		const accessToken = user.genrateAcessToken();

		// Update the user's token (if necessary)
		user.accessToken = accessToken;
		await user.save({ validateBeforeSave: false });

		// Send the new access token as a cookie
		const options = {
			httpOnly: true,
			// secure: process.env.NODE_ENV === "production",
			// sameSite: "Strict",
		};

		return res.status(200).cookie("accessToken", accessToken, options).json({
			message: "Token refreshed",
		});
	} catch (error) {
		console.error("Error refreshing token:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export default refreshToken;
