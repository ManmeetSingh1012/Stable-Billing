import { useState, useCallback, useEffect } from "react"
import { useForm, Controller, set } from 'react-hook-form'
import Input2 from "../../Components/input.component2"
import Register from "../Register"
import axios from "axios";
import React from 'react';
import { useSelector } from "react-redux";
import { getexpense, postexpense, deletexpense, updateexpense } from "../../constant/const";


export default function Expense() {

   const [expense, setexpense] = useState([])
   const [error, seterror] = useState("")

   const [loading, setloading] = useState(true)
   const [reloadData, setReloadData] = useState(false);
   const [deletereload, setdeletereload] = useState(false)
   const [leng, setLeng] = useState(0)
   const [expensetotal, setexpensetotal] = useState(0)
   const [update, setupdate] = useState(false)
   const [id, setid] = useState("")

   const options = ["salary", "utility", "marketing", "maintenance", "other"]



   const acess_token = useSelector((state) => state.auth.accessToken);

   const caclculate = (data) => {
      let total = 0
      let product = 0
      data.map((data) => {

         if (data.expenseamount) {
            total = total + data.expenseamount
         }
      })
      setexpensetotal(total)

   }


   const fetchdata = async () => {
      setloading(true)
      try {

         await axios.get(getexpense, {
            headers: {
               "Authorization": `Bearer ${acess_token}`
            }
         })

            .then(response => {


               setexpense(response.data.data)
               setLeng(response.data.data.length)
               caclculate(response.data.data)
               seterror("")
               //console.log("data",parties)
               //console.log("data length", parties.length)

               //console.log("data", response.data.data)


               setloading(false)

            }).catch(error => {
               console.log("error", error)

               if (error.response.data.message !== "No Expense found") {
                  seterror(error.response.data.message)
               } else {
                  setexpense([])
               }

               setloading(false)
            })

      } catch (error) {
         console.log("error", error)
         seterror(error.message)
         setloading(false)
      }
   }

   useEffect(() => {



      fetchdata()







   }, [reloadData, deletereload])














   const [cardvisible, setcardvisible] = useState(false)
   const { register, handleSubmit, watch, setValue } = useForm({ 'paymentstatus': ['pending', 'completed'] });

   const create = (data) => {

      console.log(data)

      setcardvisible(!cardvisible)


      if (update) {

         try {
            axios.put(`${updateexpense}/${id}`, data, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })
               .then(response => {
                  //console.log(response)
                  setReloadData(!reloadData)
                  seterror("")
               })
               .catch(error => {
                  console.log("error", error)
                  seterror(error.response.data.message)
               }).finally(()=>{
                  setupdate(!update)
                  setValue('expensename', "");
      setValue('expenseamount', "");
      setValue('expensetype', "");
      setid("")
                  
               })
         } catch (error) {
            console.log("error", error)
            seterror(error.message)
         }

      } else {


         try {
            axios.post(postexpense, data, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })
               .then(response => {
                  //console.log(response)
                  setReloadData(!reloadData)
                  seterror("")
               })
               .catch(error => {
                  console.log("error", error)
                  seterror(error.response.data.message)
               })
         } catch (error) {
            console.log("error", error)
            seterror(error.message)
         }

      }
   }

   const togglecard = () => {
      setcardvisible(!cardvisible)
      console.log(cardvisible)
      //alert("button clicked")

      //setupdate(!update)
                  setValue('expensename', "");
      setValue('expenseamount', "");
      setValue('expensetype', "");
      setid("")
   }


   const convertToDateOnly = (isoString) => {
      return new Date(isoString).toISOString().split('T')[0];
   };


   const edit = async (id) => {

      console.log(id)

      console.log(data)

      setcardvisible(!cardvisible)
      try {
         axios.put(postexpense, data, {
            headers: { Authorization: `Bearer ${acess_token}` }
         })
            .then(response => {
               //console.log(response)
               setReloadData(!reloadData)
               seterror("")
            })
            .catch(error => {
               console.log("error", error)
               seterror(error.response.data.message)
            })
      } catch (error) {
         console.log("error", error)
         seterror(error.message)
      }

   }

   const deleteexpense = async (id) => {


      const url = `${deletexpense}/${id}`

      try {
         axios.delete(url, {
            headers: { Authorization: `Bearer ${acess_token}` }
         })
            .then(response => {
               console.log(response)

               seterror("")
            })
            .catch(error => {
               console.log("error", error)
               seterror(error.response.data.message)
            }).finally(() => {
               fetchdata()

            })
      } catch (error) {
         console.log("error", error)
         seterror(error.message)
      }

   }



   const showFormWithExistingData = (expense) => {
      // togglecard()
      setValue('expensename', expense.expensename);
      setValue('expenseamount', expense.expenseamount);
      setValue('expensetype', expense.expensetype);
      setupdate(!update)
      setcardvisible(!cardvisible)
      setid(expense._id)
   };

   return (
      <div>
         {loading ? (
            <div>
               <h1 className="text-center">Loading...</h1>
            </div>
         ) : (
            <div>

               {expense.length == 0 ? (
                  <div>
                     <div className="w-full">
                        <span className="text-center text-red-600 p-2">{error}</span>
                        <div className={` ${cardvisible ? 'hidden' : 'visible'} flex flex-col justify-center text-center items-center align-middle content-center mt-24 `}>
                           <h1 className=" text-justify text-gray-700 text-2xl font-bold">Nothing To Show</h1>
                           <p className=" text-justify text-gray-500 text-base mb-2">Manage Your expenses Here</p>
                           <button onClick={togglecard} className="bg-orange-500 text-white px-4 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Add Your 1st Expense >"} </button>
                        </div>


                        <div className={` ${cardvisible ? 'visible' : 'hidden'}  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`} >

                           <div className="flex flex-row items-center justify-between">

                              <div>
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Expense</h1>
                              </div>

                              <div>
                                 <button onClick={togglecard} className=" text-gray-700 text-lg  font-bold  transition-colors duration-300">{"X"} </button>
                              </div>
                           </div>




                           <div>


                              <form onSubmit={handleSubmit(create)}>

                                 <div className="flex flex-row justify-start py-5 space-x-3">
                                    <Input2 placeholder="Expense Name" lable="Expense Name" type="text" className="" {...register("expensename", {
                                       required: true
                                    })} />

                                    <Input2 placeholder="Expense Amount" lable="Expense Amount" type="text" className="" {...register("expenseamount", {
                                       required: true
                                    })} />
                                 </div>

                                 <div className="flex flex-row space-x-3">
                                    <div className="">

                                       <select
                                          className="rounded-lg w-fit p-1 border border-gray-300 text-gray-500"
                                          {...register("expensetype", { required: true })}
                                       >
                                          <option className="text-gray-400" value="">
                                             -- Select Product --
                                          </option>
                                          {options.map((data, index) => (
                                             <option className="text-black" key={index} value={data}>
                                                {data}
                                             </option>
                                          ))}
                                       </select>
                                    </div>




                                 </div>













                                 <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-lg">Submit</button>
                              </form>

                           </div>
                        </div>

                     </div>
                  </div>
               ) : (


                  <div>
                     <div className="w-full">
                        <span className="text-center text-red-600 p-2">{error}</span>
                        <div className={` ${cardvisible ? 'visible' : 'hidden'}  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`} >

                           <div className="flex flex-row items-center justify-between">

                              <div>
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Expense</h1>
                              </div>

                              <div>
                                 <button onClick={togglecard} className=" text-gray-700 text-lg  font-bold  transition-colors duration-300">{"X"} </button>
                              </div>
                           </div>




                           <div>


                              <form onSubmit={handleSubmit(create)}>

                                 <div className="flex flex-row justify-start py-5 space-x-3">
                                    <Input2 placeholder="Expense Name" lable="Expense Name" type="text" className="" {...register("expensename", {
                                       required: true
                                    })} />

                                    <Input2 placeholder="Expense Amount" lable="Expense Amount" type="text" className="" {...register("expenseamount", {
                                       required: true
                                    })} />
                                 </div>

                                 <div className="flex flex-row space-x-3">
                                    <div className="">

                                       <select
                                          className="rounded-lg w-fit p-1 border border-gray-300 text-gray-500"
                                          {...register("expensetype", { required: true })}
                                       >
                                          <option className="text-gray-400" value="">
                                             -- Select Product --
                                          </option>
                                          {options.map((data, index) => (
                                             <option className="text-black" key={index} value={data}>
                                                {data}
                                             </option>
                                          ))}
                                       </select>
                                    </div>




                                 </div>













                                 <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-lg">Submit</button>
                              </form>

                           </div>
                        </div>


                        <div className={`${cardvisible ? 'hidden' : 'visible'}`}>
                           <div className="w-full flex flex-col flex-wrap  bg-gray-200">

                              <div className="m-2 bg-white rounded-sm shadow-md p-5">


                                 <h1 className="text-justify text-gray-900 text-xl font-normal">This Month Expense Data: <span className="text-justify text-gray-700 text-base"> {`${leng} expense count this month`}</span> </h1>

                                 <div className="flex flex-row flex-wrap justify-start">

                                    <div className="bg-green-300 shadow-md rounded-lg relative p-3 m-3">

                                       <p className="text-justify text-gray-900 text-base font-semibold">Total Expense amount this month</p>


                                       <p className="text-justify text-gray-900 text-base font-semibold">{`${expensetotal}`}</p>
                                    </div>


                                 </div>

                              </div>

                           </div>





                           <div className="w-full flex flex-col flex-wrap  bg-gray-200">

                              <div className="mx-2 mb-2 bg-white rounded-sm shadow-md p-5">





                                 <div class="flex justify-between items-center mb-4">
                                    <h2 class="text-lg font-semibold">Expense Details</h2>
                                    <div class="flex items-center">
                                       <svg class="w-[27px] h-[27px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                          <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                       </svg>


                                       <button onClick={togglecard} class="text-gray-600 text-sm ml-1">Add Expense</button>
                                    </div>
                                 </div>

                                 <div class="overflow-x-auto">
                                    <table className="table-fixed w-full border-collapse border border-gray-200">
                                       <thead>
                                          <tr>
                                             <th className="px-4 py-2 w-1/5 text-start">S.No</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Expense Name</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Expense Amount</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Expense Date</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Expense Type</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Action</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {expense.map((data, index) => (
                                             <tr key={data._id}>
                                                <td className="px-4 py-2 w-1/5 text-start">{index}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.expensename}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.expenseamount}</td>
                                                <td className="px-4 py-2 w-1/5 text-start"> {convertToDateOnly(data.expensedate)}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.expensetype}</td>

                                                <td className={`px-4 py-2 w-1/5 text-start`}>

                                                   <div className="flex flex-row flex-wrap space-x-1">

                                                      <div onClick={() => showFormWithExistingData(data)}>
                                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                         </svg>
                                                      </div>

                                                      <div onClick={() => deleteexpense(data._id)}>
                                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                         </svg>

                                                      </div>
                                                   </div>




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




/*
 <form className='content-center' onSubmit={handleSubmit(create)}>

                                 <div className="flex flex-row flex-wrap ">
                                    <Input2 placeholder="*Productname" lable="Productname" type="text" className="p-5"

                                       {...register("productname", {
                                          required: true
                                       })} />


                                    <Input2 placeholder="*Quantity" lable="Quantity" type="number" className="p-5" {...register("quantity", {
                                       required: true
                                    })} />
<div className="">
        <select
          className="rounded-lg w-fit p-1 border border-gray-300 text-gray-500"
          {...register("productname", {
            required: true
          })}
        >*/