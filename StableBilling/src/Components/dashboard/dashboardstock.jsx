export default function Dashboardstock({inventory}) {


   
   let total = 0
   let higeststock = ""
   let higeststockvalue = 0
   let loweststock = ""
   let loweststockvalue = Number.MAX_SAFE_INTEGER






   if(inventory)
   {
      inventory.map((data) => {

         total = total +( data.unitprice * data.quantity)
         

         if(data.quantity > higeststockvalue)
         {
            higeststockvalue = data.quantity
            higeststock = data.productname
         }else if(data.quantity < loweststockvalue)
         {
            loweststockvalue = data.quantity
            loweststock = data.productname
         }

      })

      console.log("total",total)
      console.log("higeststock",higeststock)
      console.log("loweststock",loweststock)
   }
   return (
      <div className="w-1/4 ml-2 flex-col rounded shadow bg-white ">

         <div className="p-5 ">
            <h1 className="text-gray-800  text-normal font-semibold">Inventory Value</h1>
            <h1 className="text-gray-800 text-normal font-semibold">{`₹ ${total.toLocaleString()}`}</h1>


            

                  
            <div className="mt-3 ">
      
          <p className="name text-gray-800 text-sm text-start font-normal">Most Stocked product:</p>
          <p className="name text-gray-800 text-sm text-end font-normal">{higeststock}</p>

          <p className="name text-gray-800 text-start text-sm font-normal">low Stocked product:</p>
          <p className="name text-gray-800 text-end text-sm font-normal">{loweststock}</p>
          
        
    </div>

                 
         </div>


      </div>
   )
}