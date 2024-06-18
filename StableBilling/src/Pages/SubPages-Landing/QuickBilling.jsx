import Bill from "../../Components/bill.component"
import FakeBill from "../../Components/fakebill"
import BillingInfo from "../../Components/billinginfo"
import { useState } from "react"
import FinalBill from "../../Components/finalbill.component"
import { usePDF, Margin } from 'react-to-pdf';

import { useNavigate } from "react-router-dom"
export default function QuickBilling() {


   const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' })


   const [billinginfo, setbillinginfo] = useState(false)
   const [newbill, setnewbill] = useState(false)

   const [billingdata, setbillingdata] = useState([])

   const navigate = useNavigate()

   const handlecancel = () => {
      setbillinginfo(false)
   }

   const handlesave = (data) => {
      console.log(data)
      setbillingdata(data)

      setbillinginfo(false)
      setnewbill(true)

   }

   const quickbill = () => {
      setbillinginfo(true)
   }


   const home = () => {
      setnewbill(false)

   }
   return (
      <div className="w-full">


         {

            newbill ? (

               <div className="flex flex-col justify-center">
                  <h1 className=" text-center text-gray-700 text-2xl font-bold mb-5">Your Bill</h1>

                  <div ref={targetRef}>
                     <FinalBill data={billingdata} />
                  </div>



                  <div className="flex flex-wrap flex-row justify-center">

                     <button type="button" onClick={home} className=" mx-auto w-fit bg-orange-500 text-white px-6 mt-5 mb-5 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Create More Bill"} </button>
                     <button type="button" onClick={() => { toPDF() }} className=" mx-auto w-fit bg-orange-500 text-white px-6 mt-5 mb-5 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Create pdf"} </button>
                  </div>
               </div>
            ) : (
               <div>

                  {billinginfo ? (



                     <BillingInfo onCancel={handlecancel} onSave={handlesave} />

                  ) : (


                     <div className="  flex flex-col justify-center text-center items-center align-middle content-center ">
                        <h1 className=" text-gray-700 text-2xl font-bold mb-5">Quick Billing</h1>
                        <FakeBill />
                        <button type="button" onClick={quickbill} className="bg-orange-500 text-white px-6 mt-5 mb-5 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Create Quick like above Bill>"} </button>
                     </div>
                  )

                  } </div>

            )
         }
      </div>
   )
}