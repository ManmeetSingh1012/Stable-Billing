import React, { useEffect, useState } from 'react'

export default function FinalBill({data})
{
   const [date, setdate] = useState({})

   useEffect(() => {

      const date = new Date()
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let today = `${day}/${month}/${year}`
      setdate(today)

   }, [])

   return (

      <div>

         <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div class="flex items-center justify-between mb-8">
               <div class="flex items-center">
               <img src="/src/assets/billing.svg" alt="Logo" />
                  <div class="text-gray-700 font-semibold text-lg ml-1">Stable Billing</div>
               </div>
               <div class="text-gray-700">
                  <div class="font-bold text-xl mb-2">INVOICE</div>
                  <div class="text-sm">{`Date : ${date}`}</div>
                  <div class="text-sm">{`Invoice #: ${data.invoiceno}`}</div>
               </div>
            </div>
            <div class="border-b-2 border-gray-300 pb-8 mb-8 text-right">
               <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
               <div class="text-gray-700 mb-2">{`${data.partyname}`}</div>
               <div class="text-gray-700 mb-2">Ambani Street 123.</div>
               <div class="text-gray-700 mb-2">Mumbai 12345</div>
               
            </div>
            <table class="w-full text-left mb-8">
               <thead>
                  <tr>
                     <th class="text-gray-700 font-bold uppercase py-2">Items</th>
                     <th class="text-gray-700 font-bold uppercase py-2">Quantity</th>
                     <th class="text-gray-700 font-bold uppercase py-2">Price</th>
                     <th class="text-gray-700 font-bold uppercase py-2">Total</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td class="py-4 text-gray-700">Product 1</td>
                     <td class="py-4 text-gray-700">1</td>
                     <td class="py-4 text-gray-700">Rs.100.00</td>
                     <td class="py-4 text-gray-700">Rs.100.00</td>
                  </tr>
                  <tr>
                     <td class="py-4 text-gray-700">Product 2</td>
                     <td class="py-4 text-gray-700">2</td>
                     <td class="py-4 text-gray-700">Rs.50.00</td>
                     <td class="py-4 text-gray-700">Rs.100.00</td>
                  </tr>
                  <tr>
                     <td class="py-4 text-gray-700">Product 3</td>
                     <td class="py-4 text-gray-700">3</td>
                     <td class="py-4 text-gray-700">Rs.75.00</td>
                     <td class="py-4 text-gray-700">Rs.225.00</td>
                  </tr>
               </tbody>
            </table>
            <div class="flex justify-end mb-8">
               <div class="text-gray-700 mr-2">Subtotal:</div>
               <div class="text-gray-700">Rs.425.00</div>
            </div>
            <div class="text-right mb-8">
               <div class="text-gray-700 mr-2">Tax:</div>
               <div class="text-gray-700">Rs.25.50</div>

            </div>
            <div class="flex justify-end mb-8">
               <div class="text-gray-700 mr-2">Total:</div>
               <div class="text-gray-700 font-bold text-xl">Rs.450.50</div>
            </div>
            <div class="border-t-2 border-gray-300 pt-8 mb-8">
               <div class="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
               <div class="text-gray-700 mb-2">Please make checks payable to Stable Billing and mail to:manger@stablebilling.com</div>
               <div class="text-gray-700">123AB Main St., Bengaluru-22346</div>
            </div>
         </div>
      </div>
   )
}