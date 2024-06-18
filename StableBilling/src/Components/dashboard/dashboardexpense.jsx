import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState } from 'react';
import { ExitFullScreenIcon } from '@radix-ui/react-icons';
export default
   function DashboardExpense({expensedata}) {


      const [expense,setexpense] = useState()


      //const [uData, setuData] = useState([])

      let uData = []
      let total = 0

      if(expensedata)
      {

         let sal = 0 
         let mark = 0
         let util = 0
         let maint = 0
         let other = 0

         expensedata.map((data) => {

            total = total + data.expenseamount

            if(data.expensetype === "salary")
            {
               sal = sal + data.expenseamount
            }else if(data.expensetype === "marketing")
            {
               mark = mark + data.expenseamount
            
            }else if(data.expensetype === "utility")
            {
               util = util + data.expenseamount

            }else if(data.expensetype === "maintenance")
            {
               maint = maint + data.expenseamount

            }else{
               other = other + data.expenseamount
            }

         })

          uData = [sal,mark,util,maint,other]
         //setuData(data)

      }else{
         uData = [ 4000 , 5000 , 3000 , 2000 , 3000]

         //setuData(data)
      }

      

  
   const xLabels = [
      'Salary',
      'Marketing',
      'Utility',
      'Maintainance',
      'Other'
      
   ];

   

   return (
      <div className="w-1/2 flex-col rounded shadow ml-2  bg-white mt-2">

         <div className="p-3">
            <h1 className="text-gray-800  text-normal font-semibold">This Month Expenses</h1>
            <h1 className="text-gray-800 text-normal font-semibold">{`₹ ${total.toLocaleString()}`}</h1>





            <div className="">

               <BarChart
                  width={800}
                  height={300}
                  series={[
                     
                     { data: uData, label: 'Expenses', id: 'uvId' },
                  ]}
                  xAxis={[{ data: xLabels, scaleType: 'band' , categoryGapRatio: 0.5}]}
               />

            </div>


         </div>


      </div>
   )

}