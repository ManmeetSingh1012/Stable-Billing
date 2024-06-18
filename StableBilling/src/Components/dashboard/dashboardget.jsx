export default function DashboardGet({parties}) {


   let total = 0

   let datas = [
       ]

       if(parties.length>0){

         let count = 0;

         parties.map((party, index) => {
            if (party.type === "recieve" && count < 5) {
               datas.push({ "towhom": party.name, "amount": party.balance })
               total = total + party.balance
               count++;
            }
         })


       }else{
            datas.push({ "towhom": "", "amount": "" })
       }


   return (
      <div className="w-1/4 ml-2 flex-col rounded shadow bg-white mt-2">

         <div className="p-5">
            <h1 className="text-gray-800  text-normal font-semibold">Amount to be acquired</h1>
            <h1 className="text-gray-800 text-normal font-semibold"><span className=" text-green-500 text-seimibold mb-8">↓</span>{`₹ ${total.toLocaleString()}`}</h1>





            <div className="mt-3">
               {datas.map((data, index) => (
                  <div key={index} className="flex flex-row justify-between">
                     <p className="name text-gray-800 text-sm font-normal">{data.towhom}</p>
                     <p className=" text-green-500 amount text-sm font-normal">{data.amount}</p>
                  </div>
               ))}
            </div>


         </div>


      </div>
   )
}