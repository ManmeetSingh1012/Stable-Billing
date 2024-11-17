import mongoose from "mongoose";

const invoicehistory = new mongoose.Schema(
  {
    partyname: {
      required: true,
      type: String,
    },

    partyemail: {
      required: true,
      type: String,
    },

    invoicelink: {
      required: true,
      type: String,
    },

    invoicedate: {
      required: true,
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const InvoiceHistory = mongoose.model("InvoiceHistory", invoicehistory);
export { InvoiceHistory };
