import { Router } from "express";
import { signup ,registerbusiness , currentuser ,login ,logout , refreshToken , verifyToken} from "../Controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";


const userrouter = Router();

userrouter.route("/signup").post(signup)
userrouter.route("/registerbusiness").post( verifyJWT,registerbusiness )

userrouter.route("/login").post(login)
userrouter.route("/logout").delete(verifyJWT,logout)

userrouter.route("/refresh-token")
userrouter.route("/currentuser").get(verifyJWT,currentuser)

// userrouter.route("/updatedetails")




export default userrouter;