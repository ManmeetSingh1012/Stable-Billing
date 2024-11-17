import send_mail from "../service/emailservice.js";
import { InvoiceHistory } from "../models/inovicehistory.js";

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

    // Save invoice to the database
    const invoice = await InvoiceHistory.create({
      partyemail: email,
      partyname: name,
      invoicelink: pdf.filename,
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
      console.log("Email sent successfully:", response);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { uploadpdf, getpdfdata };
