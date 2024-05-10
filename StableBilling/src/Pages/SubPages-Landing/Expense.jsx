import { useState } from "react"
export default function Expense() {


   const [cardvisible, setcardvisible] = useState(false)
   const togglecard= ()=>{
      setcardvisible(!cardvisible)
      console.log(cardvisible)
      alert("button clicked")
   }

   return (

      <div className="w-full">

       
            <div className=  {`${ cardvisible ? 'hidden' : 'visible'} backdrop:flex flex-col   justify-center text-center items-center align-middle content-center mt-52.`} >
               <h1 className=" text-gray-700 text-2xl font-bold">Nothing To Show</h1>
               <p className=" text-gray-500 text-base mb-2">Record your business expenses & know your real profits.</p>
               <button onClick = {togglecard} className="bg-orange-500 text-white px-4 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Add Your 1st Expense >"} </button>
            </div>


            <div className= {`${ cardvisible ? 'visible' : 'hidden'} w-fit h-min  my-auto   bg-white shadow rounded mx-10 `} >

            <h1 className=" text-gray-700 text-2xl font-bold">Nothing To Show</h1>
               <p className=" text-gray-500 text-base mb-2">Record your business expenses & know your real profits.</p>


               <h1 className=" text-gray-700 text-2xl font-bold">Nothing To Show</h1>
               <p className=" text-gray-500 text-base mb-2">Record your business expenses & know your real profits.</p>

            </div>



       


      </div>
   )

}