import { useState, useCallback, useEffect } from "react"
import { useForm, Controller, set, Form } from 'react-hook-form'
import Input2 from "./input.component2";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import React from 'react';



import { acess_token, getparties_url, getinventory } from "../constant/const";


export default function BillingInfo({onCancel , onSave}) {




   const [parties, setparties] = useState([])



   const [inventory, setinventory] = useState([])
   useEffect(() => {

      const fetchuserdata = async () => {

         try {

            await axios.get(getparties_url, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })

               .then(response => {


                  console.log("data", response.data.data)
                  setparties(response.data.data)


                  //console.log("data",parties)
                  //console.log("data length", parties.length)

                  //console.log("data", response.data.data)


                  //setloading(false)

               }).catch(error => {
                  console.log("error", error)

               })

         } catch (error) {
            console.log("error", error)

         }
      }


      const fetchinventorydata = async () => {

         try {

            await axios.get(getinventory, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })

               .then(response => {


                  console.log("data", response.data.data)
                  setinventory(response.data.data)


                  //console.log("data",parties)
                  //console.log("data length", parties.length)

                  //console.log("data", response.data.data)


                  //setloading(false)

               }).catch(error => {
                  console.log("error", error)

               })

         } catch (error) {
            console.log("error", error)

         }
      }

      fetchuserdata()
      fetchinventorydata()

      console.log("data", parties)


   }, [])



   const options = []

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({})

   const onSubmit = (data) => console.log(data)

   const [selectedOption, setSelectedOption] = useState("");
   const [showOptions, setShowOptions] = useState(true);

   const handleOptionClick = (option) => {
      setSelectedOption(option);
      setShowOptions(false);
   }

   const [counter, setCounter] = useState([1]);

   console.log(counter.length)

   const handleClick = () => {
      setCounter([...counter, counter.length + 1]);
      console.log(counter);
   };

   const handleDecrement = () => {
      if (counter.length > 0) {
         setCounter(counter.slice(0, -1)); // Remove the last element from the array
      }
   };

   const onsave = (data) =>{
      data.count = counter
      console.log(data)
      onSave(data)
   }

   return (

      <div className="w-fit p-3">


         <div>
            <h1 className=" pl-3 text-red-600 text-md  text-center font-normal">*Disclaimer : All fields are required</h1>
            <h1 className=" pl-3 text-red-600 text-md text-center font-normal">*Disclaimer : If product and party name is not in the list add them in there respective section</h1>
         </div>

         <div>
            <h1 className=" p-3 text-gray-800 text-xl font-semibold">Invoice Info:</h1>
         </div>

         <div className="">


            <form onSubmit={handleSubmit(onsave)}>


               <div className="flex flex-col flex-wrap">
                  <h1 className="text-gray-800 mx-2">Add Customer Details :</h1>
                  <div className="flex flex-row justify-start align-middle content-center ml-2 mb-5 mt-5">


                     <div className="border border-gray-400 rounded-lg w-fit ">



                        <select className="rounded-lg w-fit p-1"  {...register("partyname", {
                           required: true
                        })}>
                           <option className="">{"--select Customer-->"}</option>
                           {parties.map((party) => (
                              <option className="" key={party.id} value={party.name}>
                                 {party.name}
                              </option>
                           ))}


                        </select>

                        

                     </div>
                  </div>

               </div>


               <hr class=" h-px m-2 mr-48 bg-gray-200 border-0 dark:bg-gray-300"></hr>





               {counter.map((_, index) => {

                  return (



                     <div className="flex flex-col flex-wrap mt-5 ">
                        <h1 className="text-gray-800 mx-2">Add Product Details Details :</h1>
                        <div key={index} className="flex flex-row justify-start  ml-2 mb-5 mt-5">


                           <span className="text-gray  mx-2 ">{`${index + 1}.`}</span>


                           <div className="border border-gray-400 rounded-lg w-fit mx-2">



                              <select className="rounded-lg w-fit p-1"  {...register(`productname${index + 1}`, {
                                 required: true
                              })}>
                                 <option className="">{"--select Inventory-->"}</option>
                                 {inventory.map((party) => (
                                    <option className="" key={party.id} value={party.productname}>
                                       {party.productname}
                                    </option>
                                 ))}

                                 
                              </select>



                           </div>



                           <input {...register(`quantity${index + 1}`, {
                              required: true
                           })} className="border border-gray-400 rounded-lg w-fit p-1 placeholder:text-gray-800" placeholder="Quanity"></input>


                        </div>
                     </div>



                  )
               })}


               <div className="flex flex-wrap flex-row">

                  <button type={"button"} onClick={handleClick} class="w-fit p-2 m-3 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">+ Add product</button>
                  <button type={"button"} onClick={handleDecrement} class="w-fit p-2 m-3  text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">- Delete Product</button>
               </div>

               <hr class=" h-px m-2 mr-48 bg-gray-200 border-0 dark:bg-gray-300"></hr>

               <div className="flex flex-col flex-wrap">
                  <h1 className="text-gray-800 mx-2">Add Invoice No :</h1>
                  <div className="flex flex-row justify-start align-middle content-center ml-2 mb-5 mt-5">


                     <div className="border border-gray-400 rounded-lg w-fit ">


                     <input {...register(`invoiceno`, {
                              required: true
                           })} className="border border-gray-400 rounded-lg w-fit p-1 placeholder:text-gray-800" placeholder="Invoice No:"></input>
 
                        </div>
                  </div>

               </div>


               <hr class=" h-px m-2 mr-48 bg-gray-200 border-0 dark:bg-gray-300"></hr>


<div className="flex flex-row flex-wrap">
<button  class="w-fit p-2 m-3  text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" type="submit">Submit</button>
<button onClick={onCancel} class="w-fit p-2 m-3  text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" type="button">Cancel</button>

            
            
</div>
               </form>




         </div>


      </div>
   )
}