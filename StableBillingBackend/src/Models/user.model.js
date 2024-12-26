import { timeStamp } from "console";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const user = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		premium: {
			type: Boolean,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
			required: false,
			default: null,
		},
		accessToken: {
			type: String,
			required: false,
			default: null,
		},
	},
	{ timestamps: true }
);

// pre middleware
user.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
	}
	next();
});

user.methods.isPasswordCorrect = async function (password) {
	console.log("ismatch3", password);
	return await bcrypt.compare(password, this.password);
};

user.methods.genrateAcessToken = function () {
	console.log(
		"genrateAcessToken",
		process.env.ACCESS_TOKEN_SECRET,
		process.env.ACCESS_TOKEN_EXPIREY
	);

	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullname: this.fullname,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIREY,
		}
	);
};

user.methods.generateRefreshToken = function () {
	console.log("genrateAcessToken2", process.env.REFRESH_TOKEN);
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIREY,
		}
	);
};

export const User = mongoose.model("User", user);
