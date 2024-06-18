
import { useState, useEffect } from "react"

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';



export default function DashboardSale({ data }) {

   
   const may = 125000
   const july = 200000
   const [transcation, setrnascation] = useState(0)

   const xLabels = ["May","June" ,"July"]

   let uData =[7800,2300]

   useEffect(() => {

      try {

         let transactions = 0
         data.map((data) => {
            transactions = transactions + data.totalprice * data.quantity
            console.log(transactions)
            
         })

         setrnascation(transactions)
         //uData.push(transactions)
         


         console.log(transcation)

      } catch (error) {
         throw error.message
      }
   })

   console.log(uData)

   return (

      <div className=" w-3/4 content-start rounded shadow bg-white ml-2">


         <div className="flex flex-col p-5">

            <h1 className="text-gray-800 text-xl font-semibold">Sales</h1>


            <div className="flex flex-row flex-wrap mt-7 mb-2 align-middle content-center justify-between items-center">



               <div>
                  <h1 className="text-gray-800 text-2xl font-bold ">{`₹ ${transcation.toLocaleString()}`}</h1>
                  <p className=" text-gray-500 text-sm mb-4">Total Sales This Month</p>
                  <p className=" text-gray-500 text-seimibold mb-8"> <span className=" text-green-500 text-seimibold mb-8">↑ 25%</span> More sales then previous month </p>

               </div>

               
               


              

               
               <div className="ml-14">
               <LineChart
                     width={500}
                     height={300}
                     series={[
                        
                        { data: [`${may}`,`${transcation}`,`${july}`] },
                     ]}
                     xAxis={[{ scaleType: 'point', data: xLabels }]}
                  />

                  <h1 className="text-green-500 text-sm font-normal">*AI Projected Sales For the Next Month (June) is around : ₹ 2,00,000</h1>

               </div>



            </div>

         </div>



      </div>
   )
}

/*

<LineChart
                     width={500}
                     height={300}
                     series={[
                        
                        { data: uData },
                     ]}
                     xAxis={[{ scaleType: 'point', data: xLabels }]}
                  />
*/