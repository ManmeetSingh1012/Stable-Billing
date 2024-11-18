import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for in-memory access

const pdfmiddleware = multer({ storage: storage }).single("invoice");

export { pdfmiddleware };
