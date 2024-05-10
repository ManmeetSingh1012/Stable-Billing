
import { Router } from "express";
import RootHandler from "../Controllers/root.controller.js";


const router = Router();

router.route("/root").get(RootHandler)


export default router;