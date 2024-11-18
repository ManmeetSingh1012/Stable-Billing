import { FileText } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BillHistory() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/pdf/uploadpdf"
      );
      console.log(response.data.invoices);

      setdata(response.data.invoices);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full px-5">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Manage your Invoice
          </h3>
          <p className="text-slate-500">Overview of the invoices.</p>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for invoice..."
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 flex items-center justify-center bg-white rounded"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden text-gray-700 bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 border-b border-slate-300">Name</th>
              <th className="p-4 border-b border-slate-300">Email</th>
              <th className="p-4 border-b border-slate-300">Created At</th>
              <th className="p-4 border-b border-slate-300 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice, index) => {
              const date = new Date(invoice.invoicedate);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <tr
                  key={index}
                  className="hover:bg-slate-50 border-b border-slate-200"
                >
                  <td className="p-4">{invoice.partyname}</td>
                  <td className="p-4">{invoice.partyemail}</td>
                  <td className="p-4">{formattedDate}</td>
                  <td className="p-4">
                    <button
                      className="text-slate-600 hover:text-slate-800 flex items-center gap-1"
                      onClick={() =>
                        window.open(`${invoice.invoicelink}`, "_blank")
                      }
                    >
                      <FileText className="w-5 h-5" />
                      View PDF
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
