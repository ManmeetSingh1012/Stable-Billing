import multer from "multer";

const upload = multer(
  {
    limits: {
      fileSize: 10 * 1024 * 1024, // 50MB limit
    },
  },

  { dest: "uploads/" }
);


const pdfmiddleware = upload.single("invoice");

export { pdfmiddleware };