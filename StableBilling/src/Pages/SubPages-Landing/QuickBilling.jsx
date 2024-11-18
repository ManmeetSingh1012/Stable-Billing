import Bill from "../../Components/bill.component";
import FakeBill from "../../Components/fakebill";
import BillingInfo from "../../Components/billinginfo";
import { useState } from "react";
import FinalBill from "../../Components/finalbill.component";
import { usePDF, Margin } from "react-to-pdf";

import { useNavigate } from "react-router-dom";
import BillHistory from "../../Components/billhistory";
import axios from "axios";
export default function QuickBilling() {
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  const [billinginfo, setbillinginfo] = useState(false);
  const [newbill, setnewbill] = useState(false);

  const [billingdata, setbillingdata] = useState([]);

  const navigate = useNavigate();

  const handlecancel = () => {
    setbillinginfo(false);
  };

  const handlesave = (data) => {
    console.log(data);
    setbillingdata(data);

    setbillinginfo(false);
    setnewbill(true);
  };

  const quickbill = () => {
    setbillinginfo(true);
  };

  const home = () => {
    setnewbill(false);
  };

  const savebill = async () => {
    try {
      // Generate PDF
      // Generate PDF
      const { blob } = await toPDF();

      // Ensure we have a Blob
      if (!(blob instanceof Blob)) {
        throw new Error("PDF generation did not produce a Blob");
      }

      // Create FormData to include bill data and PDF
      const form = new FormData();
      form.append("name", billingdata.partyname);
      form.append("email", billingdata.partyemail);
      form.append("invoice", blob, "invoice.pdf");
      form.append("sendmail", "true"); // Optional: add flag to send email

      // Send the FormData to the backend
      const response = await axios.post(
        "http://localhost:5000/api/v1/pdf/uploadpdf",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Optional: Show success message or navigate
        alert("Bill saved and PDF generated successfully!");
      }
    } catch (error) {
      console.error("Error generating or uploading PDF:", error);
      alert("Failed to generate or upload PDF");
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {newbill ? (
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-gray-700 text-2xl font-bold mb-5">
            Your Bill
          </h1>

          <div ref={targetRef}>
            <FinalBill data={billingdata} />
          </div>

          <div className="flex flex-wrap justify-center max-w-full">
            <button
              type="button"
              onClick={home}
              className="mx-auto w-fit max-w-full bg-orange-500 text-white px-6 mt-5 mb-5 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
            >
              Create More Bill
            </button>
            <button
              type="button"
              onClick={() => {
                savebill();
              }}
              className="mx-auto w-fit max-w-full bg-orange-500 text-white px-6 mt-5 mb-5 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
            >
              Create PDF
            </button>
          </div>
        </div>
      ) : (
        <div>
          {billinginfo ? (
            <BillingInfo onCancel={handlecancel} onSave={handlesave} />
          ) : (
            <div className="flex flex-col justify-center text-center items-center">
              <h1 className="text-gray-700 text-2xl font-bold mb-5">
                Quick Billing
              </h1>
              <BillHistory />
              <button
                type="button"
                onClick={quickbill}
                className="bg-orange-500 text-white px-6 mt-5 mb-5 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Click to create a Quick Bill
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
