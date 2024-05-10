import Bill from "../../Components/bill.component"
import FakeBill from "../../Components/fakebill"
import BillingInfo from "../../Components/billinginfo"
import { useState } from "react"
import FinalBill from "../../Components/finalbill.component"
export default function QuickBilling() {



   const [billinginfo , setbillinginfo] = useState(false)
   const [billingdata, setbillingdata] = useState([])

   const handlecancel = ()=>{
      setbillinginfo(false)
   }

   const handlesave = (data)=>{
      console.log(data)
      setbillingdata(data)
      setbillinginfo(false)

   }

   const quickbill = ()=>{
      setbillinginfo(true)
   }

   return (
      <div className="w-full">

         { billinginfo ? (

            

               <BillingInfo onCancel={handlecancel} onSave={handlesave}/>
            
         ) :( 


            <div className="  flex flex-col justify-center text-center items-center align-middle content-center ">
         <h1 className=" text-gray-700 text-2xl font-bold mb-5">Quick Billing</h1>
         <FakeBill/>
         <button type="button" onClick={quickbill} className="bg-orange-500 text-white px-6 mt-5 mb-5 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Create Quick like above Bill>"} </button>
         </div>
         )

          }

         
         

         
      </div>
   )
}