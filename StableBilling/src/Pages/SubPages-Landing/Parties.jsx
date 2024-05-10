import { useState, useCallback, useEffect } from "react"
import { useForm, Controller, set } from 'react-hook-form'
import Input2 from "../../Components/input.component2"
import Register from "../Register"
import axios from "axios";
import React from 'react';

import { acess_token, getparties_url, postpartes_url } from "../../constant/const";


export default function Parties() {

   const [parties, setparties] = useState([])
   const [error, seterror] = useState("")

   const [loading, setloading] = useState(true)
   const [reloadData, setReloadData] = useState(false);
   const [leng, setLeng] = useState(0)

   const [pay,setPay] = useState(0)
   const [recieve,setrecieve] = useState(0)



   const caclculate = (data) =>{
      let pay = 0
      let recieve = 0
      data.map((data) => {
         if(data.type === 'pay'){
            pay = pay + data.balance
         }else{
            recieve = recieve + data.balance
         }
      })
      setPay(pay)
      setrecieve(recieve)
   }

   useEffect(() => {

      const fetchdata = async () => {
         setloading(true)
         try {

            await axios.get(getparties_url, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })

               .then(response => {


                  setparties(response.data.data)
                  setLeng(response.data.data.length)
                  caclculate(response.data.data)
                  //console.log("data",parties)
                  //console.log("data length", parties.length)

                  //console.log("data", response.data.data)
                  

                  setloading(false)

               }).catch(error => {
                  console.log("error", error)
                  seterror(error.message)
                  setloading(false)
               })

         } catch (error) {
            console.log("error", error)
            seterror(error.message)
            setloading(false)
         }
      }

      fetchdata()

      


   }, [reloadData])



   



   const [cardvisible, setcardvisible] = useState(false)
   const { register, handleSubmit } = useForm({  });

   const create = (data) => {
      console.log("check", data);

      data.balance = Number(data.balance)


      setcardvisible(!cardvisible)
      try {
         axios.post(postpartes_url, data, {
            headers: { Authorization: `Bearer ${acess_token}` }
         })
            .then(response => {
               //console.log(response)
               setReloadData(!reloadData)
            })
            .catch(error => {
               console.log("error", error)
               seterror(error.message)
            })
      } catch (error) {
         console.log("error", error)
         seterror(error.message)
      }
   }

   const togglecard = () => {
      setcardvisible(!cardvisible)
      console.log(cardvisible)
      //alert("button clicked")
   }




   return (
      <div>
         {loading ? (
            <div>
               <h1 className="text-center">Loading...</h1>
            </div>
         ) : (
            <div>
               {parties.length == 0 ? (
                  <div>
                     <div className="w-full">
                        <div className={` ${cardvisible ? 'hidden' : 'visible'} flex flex-col justify-center text-center items-center align-middle content-center mt-24 `}>
                           <h1 className=" text-justify text-gray-700 text-2xl font-bold">Nothing To Show</h1>
                           <p className=" text-justify text-gray-500 text-base mb-2">Add Your Parties here that you deal with</p>
                           <button onClick={togglecard} className="bg-orange-500 text-white px-4 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Add Your 1st Parties >"} </button>
                        </div>


                        <div className={` ${cardvisible ? 'visible' : 'hidden'}  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`} >

                           <div className="flex flex-row items-center justify-between">

                              <div>
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Party</h1>
                              </div>

                              <div>
                                 <button onClick={togglecard} className=" text-gray-700 text-lg  font-bold  transition-colors duration-300">{"X"} </button>
                              </div>
                           </div>




                           <div>
                              <form className='content-center' onSubmit={handleSubmit(create)}>

                                 <div className="flex flex-row flex-wrap ">
                                    <Input2 placeholder="*Party Name" lable="Party Name" type="text" className="p-5"

                                       {...register("name", {
                                          required: true
                                       })} />


                                    <Input2 placeholder="*Party Phone" lable="Party Phone" type="number" className="p-5" {...register("contact", {
                                       required: true
                                    })} />

                                 </div>



                                 <div className="flex flex-row flex-wrap ">

                                    <Input2 placeholder="Email Id" lable="Email Id" type="text" className="p-5" {...register("email", {
                                       required: true
                                    })} />
                                 </div>

                                 <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                                 <div className="flex flex-row flex-wrap ">
                                    <Input2 placeholder="Opening Balance" lable="Opening Balance" type="number" className="p-5" {...register("balance", {
                                    })} />

                                    <div className="relative p-5  content-center">
                                       <input
                                          {...register("type", {
                                             
                                          })}
                                          type="radio"
                                          value="pay"
                                          id="pay"

                                          className="size-4"
                                       />
                                       <label className="text-lg ml-1" htmlFor="pay">Pay</label>
                                    </div>

                                    <div className="relative p-5  content-center ">
                                       <input
                                          {...register("type", {
                                            
                                          })}
                                          type="radio"
                                          value="recieve"
                                          id="recieve"
                                          className="size-4"
                                       />
                                       <label className="text-lg ml-1" htmlFor="recieve">Recieve</label>
                                    </div>

                                 </div>

                                 <div className="flex flex-row flex-wrap w-full">
                                    <button type="submit" className="bg-orange-500 text-white px-4 mx-5 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Save"} </button>
                                 </div>
                              </form>

                           </div>
                        </div>

                     </div>
                  </div>
               ) : (


                  <div>
                     <div className="w-full">
                        <div className={` ${cardvisible ? 'visible' : 'hidden'}  flex w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`} >

                           <div className="flex flex-row items-center justify-between">

                              <div>
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Party</h1>
                              </div>

                              <div>
                                 <button onClick={togglecard} className=" text-gray-700 text-lg  font-bold  transition-colors duration-300">{"X"} </button>
                              </div>
                           </div>



                           <form className='content-center' onSubmit={handleSubmit(create)}>

                              <div className="flex flex-row flex-wrap ">
                                 <Input2 placeholder="*Party Name" lable="Party Name" type="text" className="p-5"

                                    {...register("name", {
                                       required: true
                                    })} />


                                 <Input2 placeholder="*Party Phone" lable="Party Phone" type="number" className="p-5" {...register("contact", {
                                    required: true
                                 })} />

                              </div>



                              <div className="flex flex-row flex-wrap ">

                                 <Input2 placeholder="Email Id" lable="Email Id" type="text" className="p-5" {...register("email", {
                                    required: true
                                 })} />
                              </div>

                              <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                              <div className="flex flex-row flex-wrap ">
                                 <Input2 placeholder="Opening Balance" lable="Opening Balance" type="number" className="p-5" {...register("balance", {
                                 })} />

                                 <div className="relative p-5  content-center">
                                    <input
                                       {...register("type", {
                                          required: true
                                       })}
                                       type="radio"
                                       value="pay"
                                       id="pay"

                                       className="size-4"
                                    />
                                    <label className="text-lg ml-1" htmlFor="pay">Pay</label>
                                 </div>

                                 <div className="relative p-5  content-center ">
                                    <input
                                       {...register("type", {
                                          required: true
                                       })}
                                       type="radio"
                                       value="recieve"
                                       id="recieve"
                                       className="size-4"
                                    />
                                    <label className="text-lg ml-1" htmlFor="recieve">Recieve</label>
                                 </div>

                              </div>

                              <div className="flex flex-row flex-wrap w-full">
                                 <button type="submit" className="bg-orange-500 text-white px-4 mx-5 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Save"} </button>
                              </div>
                           </form>





                        </div>


                        <div className={`${cardvisible ? 'hidden' : 'visible'}`}>
                           <div className="w-full flex flex-col flex-wrap  bg-gray-200">

                              <div className="m-2 bg-white rounded-sm shadow-md p-5">


                                 <h1 className="text-justify text-gray-900 text-xl font-normal">This Month Parties Data: <span className="text-justify text-gray-700 text-base"> {`${leng} Parties Added this Month`}</span> </h1>

                                 <div className="flex flex-row flex-wrap justify-start">

                                    <div className="bg-red-300 shadow-md rounded-lg relative p-3 m-3">

                                       <p className="text-justify text-gray-900 text-base font-semibold">To Pay</p>

                                       
                                       <p className="text-justify text-gray-900 text-base font-semibold">{`Rs.${pay}`}</p>
                                    </div>

                                    <div className="bg-green-300 shadow-md rounded-lg relative p-3 ml-10 m-3">
                                       <p className="text-justify text-gray-900 text-base font-semibold">To Recieve</p>
                                       <p className="text-justify text-gray-900 text-base font-semibold">{`Rs.${recieve}`}</p>
                                    </div>
                                 </div>

                              </div>

                           </div>





                           <div className="w-full flex flex-col flex-wrap  bg-gray-200">

                              <div className="mx-2 mb-2 bg-white rounded-sm shadow-md p-5">





                                 <div class="flex justify-between items-center mb-4">
                                    <h2 class="text-lg font-semibold">Parties Details</h2>
                                    <div class="flex items-center">
                                       <svg class="w-[27px] h-[27px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                          <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                       </svg>


                                       <button onClick={togglecard} class="text-gray-600 text-sm ml-1">Add Parties</button>
                                    </div>
                                 </div>

                                 <div class="overflow-x-auto">
                                    <table className="table-fixed w-full border-collapse border border-gray-200">
                                       <thead>
                                          <tr>
                                             <th className="px-4 py-2 w-1/5 text-start">S.No</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Party Name</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Party Contact</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Party Balance</th>

                                             <th className="px-4 py-2 w-1/5 text-start">Type</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {parties.map((data, index) => (
                                             <tr key={data._id}>
                                                <td className="px-4 py-2 w-1/5 text-start">{index}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.name}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.contact}</td>


                                                <td className={`px-4 py-2 w-1/5 text-start ${data.type === 'recieve' ? 'text-green-500' : 'text-red-500'}`}>
                                                   {data.balance}
                                                </td>
                                                <td className={`px-4 py-2 w-1/5 text-start ${data.type === 'recieve' ? 'text-green-500' : 'text-red-500'}`}>
                                                   {data.type}
                                                </td>
                                             </tr>
                                          ))}
                                       </tbody>
                                    </table>
                                 </div>






                              </div>

                           </div>
                        </div>




                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );




}




