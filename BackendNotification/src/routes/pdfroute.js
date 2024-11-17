import { Router } from "express";
import { pdfmiddleware } from "../middleware/multer.js";
import { uploadpdf, getpdfdata } from "../controller/uplaodpdf.js";

const pdfroute = Router();

pdfroute.route("/uploadpdf").post(pdfmiddleware, uploadpdf).get(getpdfdata);

export default pdfroute;
