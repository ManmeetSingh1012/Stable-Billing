import { useState, useCallback, useEffect } from "react"
import { useForm, Controller, set } from 'react-hook-form'
import Input2 from "../../Components/input.component2"
import Register from "../Register"
import axios from "axios";
import React from 'react';

import { acess_token, getsale , postsale } from "../../constant/const";


export default function Purchase() {

   const [sale, setsale] = useState([])
   const [error, seterror] = useState("")

   const [loading, setloading] = useState(true)
   const [reloadData, setReloadData] = useState(false);
   const [leng, setLeng] = useState(0)

   const [transaction, settransaction] = useState(0)
   const [product, setproduct] = useState(0)



   const caclculate = (data) => {
      let trans = 0
      let product = 0
      data.map((data) => {
         if (data.quantity) {
           product = product + data.quantity
         }
         if(data.totalprice)
         {
            trans = trans + data.totalprice
         }
      })
      settransaction(trans)
      setproduct(product)
   }

   useEffect(() => {

      const fetchdata = async () => {
         setloading(true)
         try {

            await axios.get(getsale, {
               headers: {
                  "Authorization": `Bearer ${acess_token}`
               }
            })

               .then(response => {


                  setsale(response.data.data)
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
   const { register, handleSubmit } = useForm({ 'paymentstatus': ['pending', 'completed'] });

   const create = (data) => {
      console.log("check", data);

      data.totalprice = Number(data.totalprice)
      data.quantity = Number(data.quantity)


      setcardvisible(!cardvisible)
      try {
         axios.post(postsale, data, {
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
               {sale.length == 0 ? (
                  <div>
                     <div className="w-full">
                        <div className={` ${cardvisible ? 'hidden' : 'visible'} flex flex-col justify-center text-center items-center align-middle content-center mt-24 `}>
                           <h1 className=" text-justify text-gray-700 text-2xl font-bold">Nothing To Show</h1>
                           <p className=" text-justify text-gray-500 text-base mb-2">Manage Your Sales Here</p>
                           <button onClick={togglecard} className="bg-orange-500 text-white px-4 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Add Your 1st Parties >"} </button>
                        </div>


                        <div className={` ${cardvisible ? 'visible' : 'hidden'}  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`} >

                           <div className="flex flex-row items-center justify-between">

                              <div>
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Sale</h1>
                              </div>

                              <div>
                                 <button onClick={togglecard} className=" text-gray-700 text-lg  font-bold  transition-colors duration-300">{"X"} </button>
                              </div>
                           </div>




                           <div>
                              <form className='content-center' onSubmit={handleSubmit(create)}>

                                 <div className="flex flex-row flex-wrap ">
                                    <Input2 placeholder="*Productname" lable="Productname" type="text" className="p-5"

                                       {...register("productname", {
                                          required: true
                                       })} />


                                    <Input2 placeholder="*Quantity" lable="Quantity" type="number" className="p-5" {...register("quantity", {
                                       required: true
                                    })} />

                                 </div>



                                 <div className="flex flex-row flex-wrap ">

                                    <Input2 placeholder="ProductId" lable="ProductId" type="text" className="p-5" {...register("productid", {
                                       required: true
                                    })} />

                                    <Input2 placeholder="Vendor" lable="Vendors" type="text" className="p-5" {...register("towhom", {
                                       required: true
                                    })} />
                                 </div>

                                 <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                                 <div className="flex flex-row flex-wrap ">
                                    <Input2 placeholder="TotalPrice" lable="TotalPrice" type="number" className="p-5" {...register("totalprice", {
                                    })} />

                                    <div className="relative p-5  content-center">
                                       <input
                                          {...register("paymentstatus", {
                                             required: true
                                          })}
                                          type="radio"
                                          value="pending"
                                          id="pending"

                                          className="size-4"
                                       />
                                       <label className="text-lg ml-1" htmlFor="pay">pending</label>
                                    </div>

                                    <div className="relative p-5  content-center ">
                                       <input
                                          {...register("paymentstatus", {
                                             required: true
                                          })}
                                          type="radio"
                                          value="completed"
                                          id="completed"
                                          className="size-4"
                                       />
                                       <label className="text-lg ml-1" htmlFor="recieve">completed</label>
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
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Sales</h1>
                              </div>

                              <div>
                                 <button onClick={togglecard} className=" text-gray-700 text-lg  font-bold  transition-colors duration-300">{"X"} </button>
                              </div>
                           </div>



                                 <form className='content-center' onSubmit={handleSubmit(create)}>

                                    <div className="flex flex-row flex-wrap ">
                                       <Input2 placeholder="*Productname" lable="Productname" type="text" className="p-5"

                                          {...register("productname", {
                                             required: true
                                          })} />


                                       <Input2 placeholder="*Quantity" lable="Quantity" type="number" className="p-5" {...register("quantity", {
                                          required: true
                                       })} />

                                    </div>



                                    <div className="flex flex-row flex-wrap ">

                                       <Input2 placeholder="ProductId" lable="ProductId" type="text" className="p-5" {...register("productid", {
                                          required: true
                                       })} />

                                       <Input2 placeholder="Client" lable="Client" type="text" className="p-5" {...register("towhom", {
                                          required: true
                                       })} />
                                    </div>

                                    <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                                    <div className="flex flex-row flex-wrap ">
                                       <Input2 placeholder="TotalPrice" lable="TotalPrice" type="number" className="p-5" {...register("totalprice", {
                                       })} />

                                       <div className="relative p-5  content-center">
                                          <input
                                             {...register("paymentstatus", {
                                                required: true
                                             })}
                                             type="radio"
                                             value="pending"
                                             id="pending"

                                             className="size-4"
                                          />
                                          <label className="text-lg ml-1" htmlFor="pay">pending</label>
                                       </div>

                                       <div className="relative p-5  content-center ">
                                          <input
                                             {...register("paymentstatus", {
                                                required: true
                                             })}
                                             type="radio"
                                             value="completed"
                                             id="completed"
                                             className="size-4"
                                          />
                                          <label className="text-lg ml-1" htmlFor="recieve">completed</label>
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


                                 <h1 className="text-justify text-gray-900 text-xl font-normal">This Month Sales Data: <span className="text-justify text-gray-700 text-base"> {`${leng} Transaction Made this Month`}</span> </h1>

                                 <div className="flex flex-row flex-wrap justify-start">

                                    <div className="bg-red-300 shadow-md rounded-lg relative p-3 m-3">

                                       <p className="text-justify text-gray-900 text-base font-semibold">Total Product Selled</p>


                                       <p className="text-justify text-gray-900 text-base font-semibold">{`${product}`}</p>
                                    </div>

                                    <div className="bg-green-300 shadow-md rounded-lg relative p-3 ml-10 m-3">
                                       <p className="text-justify text-gray-900 text-base font-semibold">Total Sales Value</p>
                                       <p className="text-justify text-gray-900 text-base font-semibold">{`Rs.${transaction}`}</p>
                                    </div>
                                 </div>

                              </div>

                           </div>





                           <div className="w-full flex flex-col flex-wrap  bg-gray-200">

                              <div className="mx-2 mb-2 bg-white rounded-sm shadow-md p-5">





                                 <div class="flex justify-between items-center mb-4">
                                    <h2 class="text-lg font-semibold">Sales Details</h2>
                                    <div class="flex items-center">
                                       <svg class="w-[27px] h-[27px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                          <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                       </svg>


                                       <button onClick={togglecard} class="text-gray-600 text-sm ml-1">Add Sales</button>
                                    </div>
                                 </div>

                                 <div class="overflow-x-auto">
                                    <table className="table-fixed w-full border-collapse border border-gray-200">
                                       <thead>
                                          <tr>
                                             <th className="px-4 py-2 w-1/5 text-start">S.No</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Product Name</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Client</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Quantity</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Total Price</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Pyament Status</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {sale.map((data, index) => (
                                             <tr key={data._id}>
                                                <td className="px-4 py-2 w-1/5 text-start">{index}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.productname}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.towhom}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.quantity}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.totalprice}</td>

                                                <td className={`px-4 py-2 w-1/5 text-start ${data.paymentstatus === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                                                   {data.paymentstatus}
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
