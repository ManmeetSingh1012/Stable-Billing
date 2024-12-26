import { Router } from "express";
import {
	signup,
	registerbusiness,
	currentuser,
	login,
	logout,
} from "../Controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/verifyToken.middleware.js";
import refreshToken from "../Controllers/token.controller.js";

const userrouter = Router();

userrouter.route("/refreshToken").post(refreshToken);

userrouter.route("/signup").post(signup);
userrouter.route("/registerbusiness").post(verifyJWT, registerbusiness);

userrouter.route("/login").post(login);
userrouter.route("/logout").delete(verifyJWT, logout);

userrouter.route("/currentuser").get(verifyJWT, currentuser);

// userrouter.route("/updatedetails")

export default userrouter;
