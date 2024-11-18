import send_mail from "../service/emailservice.js";
import { InvoiceHistory } from "../models/inovicehistory.js";
import { geturl, puturl } from "../service/s3.js";
import axios from "axios";

const uploadpdf = async (req, res) => {
  try {
    const pdf = req.file;
    const { email, name, sendmail } = req.body;

    // Validate required fields
    if (!pdf || !email || !name) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF, and provide name and email.",
      });
    }

    // Generate a unique filename
    const filename = `${Date.now()}_invoice_${email}.pdf`;

    // Generate a signed PUT URL
    const putUrl = await puturl(filename);

    // Upload the PDF file to S3
    const uploadResponse = await axios.put(putUrl, pdf.buffer, {
      headers: {
        "Content-Type": pdf.mimetype, // Ensure the correct content type is sent
      },
    });

    // Generate a signed GET URL for the uploaded file
    const getUrl = await geturl(filename);

    // Save the invoice details to the database
    const invoice = await InvoiceHistory.create({
      partyemail: email,
      partyname: name,
      invoicelink: getUrl, // Save the GET URL
    });

    if (!invoice) {
      return res.status(500).json({
        success: false,
        message: "Failed to save the invoice.",
      });
    }

    // If sendmail flag is true, send the email
    if (sendmail === "true") {
      const response = await send_mail({
        email: email,
        path: pdf.path,
        filename: pdf.filename,
      });

      if (response instanceof Error) {
        return res.status(500).json({
          success: false,
          message: "Failed to send the email.",
        });
      }

      // Log successful email response
    }

    // Respond with success
    res.status(200).json({
      success: true,
      message: "PDF uploaded and processed successfully.",
      invoice,
    });
  } catch (error) {
    console.error("Error in uploadpdf:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getpdfdata = async (req, res) => {
  try {
    const invoices = await InvoiceHistory.find();
    if (!invoices) {
      return res.status(404).json({
        success: false,
        message: "No invoices found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      invoices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { uploadpdf, getpdfdata };
