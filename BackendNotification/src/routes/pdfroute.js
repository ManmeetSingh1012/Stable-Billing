import {Router} from 'express';
import { pdfmiddleware } from '../middleware/multer.js';
import { uploadpdf } from '../controller/uplaodpdf.js';


const pdfroute = Router();

pdfroute.route('/uploadpdf').post(pdfmiddleware,uploadpdf)



export default pdfroute;