import React, { useEffect, useState  } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { getinventory } from '../constant/const'
export default function FinalBill({ data }) {

   const acess_token = useSelector((state) => state.auth.accessToken);
   const [parties, setparties] = useState([])
   const product = data.count
   console.log("product count", product)
   useEffect(() => {

      const fetchdata = async () => {
         //setloading(true)
         try {

            await axios.get(getinventory, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })

               .then(response => {


                  setparties(response.data.data)


                  console.log("data", setparties)
                  //console.log("data length", parties.length)

                  //console.log("data", response.data.data)


                  //setloading(false)

               }).catch(error => {
                  console.log("error", error)
                  //seterror(error.message)
                  //setloading(false)
               })

         } catch (error) {
            console.log("error", error)
            //seterror(error.message)
            //setloading(false)
         }
      }

      fetchdata()




   }, [])

   console.log("data", parties[0])

   let unitprice = []
   for (let i = 0; i < data.count.length; i++) {

      let products = data[`productname${i + 1}`]

      for (let j = 0; j < parties.length; j++) {

         if (parties[j].productname === products) {
            unitprice.push(parties[j].unitprice)
         }

      }

   }

   console.log("unitprice", unitprice)


   let totalPrice = 0;
   let taxAmount = 0;
   let totalValueAfterTax = 0;

   // Iterate through each product row and calculate the total price
   product.forEach((_, index) => {
      // Calculate the total price for the current product
      const productTotal = data[`quantity${index + 1}`] * unitprice[index];

      // Add the total price of the current product to the overall total
      totalPrice += productTotal;
   });

   taxAmount = totalPrice * 0.18;

   // Calculate the total value after adding a 10% tax
   totalValueAfterTax = totalPrice + taxAmount;




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

         <div class="bg-white rounded-lg shadow-lg px-8 py-5 max-w-xl mx-auto">
            <div class="flex items-center justify-between mb-8">
               <div class="flex items-center">
                  <img src="/src/assets/billing.svg" alt="Logo" />
                  <div class="text-gray-700 font-semibold text-lg ml-1">Stable Billing</div>
               </div>
               <div class="text-gray-700">
                  <div class="font-bold text-xl mb-2">INVOICE</div>
                  <div class="text-sm">{`Date : ${date}`}</div>
                  <div class="text-sm">{`Invoice: INV#${data.invoiceno}`}</div>
               </div>
            </div>
            <div class="border-b-2 border-gray-300 pb-8 mb-5 text-right">

               <h2 class="text-2xl font-bold ">Bill To:</h2>
               <div class="text-gray-700 ">{`${data.partyname}`}</div>
               <div class="text-gray-700 mb-2">Ludhiana,Punjab</div>

            </div>
            <table class="w-full text-left mb-5">
               <thead>
                  <tr>
                     <th class="text-gray-700 font-bold uppercase py-2">Items</th>
                     <th class="text-gray-700 font-bold uppercase py-2">Quantity</th>
                     <th class="text-gray-700 font-bold uppercase py-2">Price</th>
                     <th class="text-gray-700 font-bold uppercase py-2">Total</th>
                  </tr>
               </thead>
               <tbody>





                  {product.map((_, index) => (
                     <tr key={data._id}>
                        <td className="ext-gray-700 font-bold uppercase py-2">{data[`productname${index + 1}`]}</td>
                        <td className="ext-gray-700 font-bold uppercase py-2">{data[`quantity${index + 1}`]}</td>
                        <td className="ext-gray-700 font-bold uppercase py-2">{unitprice[index]}</td>
                        <td className="ext-gray-700 font-bold uppercase py-2">{Number(data[`quantity${index + 1}`]) * unitprice[index]}</td>





                     </tr>
                  ))}







               </tbody>
            </table>

            <div class=" flex flex-row justify-end ">
               <div class="text-gray-700 mr-2">Sub Total:</div>
               <div class="text-gray-700">{`Rs.${totalPrice}`}</div>

            </div>

            <div class=" flex flex-row justify-end ">
               <div class="text-gray-700 mr-2">18 % GST:</div>
               <div class="text-gray-700">{`Rs.${taxAmount}`}</div>

            </div>
            <div class="flex flex-row justify-end mb-5">
               <div class="text-gray-700 mr-2">Total:</div>
               <div class="text-gray-700 font-bold text-xl">{`Rs.${totalValueAfterTax}`}</div>
            </div>

            <div class="border-t-2 border-gray-300 pt-8 mb-5">
               <div class=" text-center text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
               <div class=" text-center text-gray-700 mb-2">Please make checks payable to Stable Billing and mail to:manger@stablebilling.com</div>
               <div class="text-center text-gray-700">Ludhiana,Punjab</div>
            </div>
         </div>
      </div>
   )
}