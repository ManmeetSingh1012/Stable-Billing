import { useState, useCallback, useEffect } from "react"
import { useForm, Controller, set } from 'react-hook-form'
import Input2 from "../../Components/input.component2"
import Register from "../Register"
import axios from "axios";
import React from 'react';

import { postpurchase, getpurchase, postinventory, deltepurchase, updatepurchase , getinventory ,updateinventory } from "../../constant/const";


import { useSelector } from "react-redux";

export default function Purchase() {

   const [purchase, setpurchase] = useState([])
   const [inventory, setinventory] = useState([])
   const [error, seterror] = useState("")

   const [loading, setloading] = useState(true)
   const [reloadData, setReloadData] = useState(false);
   const [leng, setLeng] = useState(0)

   const [transaction, settransaction] = useState(0)
   const [product, setproduct] = useState(0)

   const [update, setupdate] = useState(false)
   const [id, setid] = useState("")

   const acess_token = useSelector((state) => state.auth.accessToken);


   const caclculate = (data) => {
      let trans = 0
      let product = 0
      data.map((data) => {
         if (data.quantity) {
            product = product + data.quantity
         }
         if (data.unitprice) {
            trans = trans + (data.quantity * data.unitprice)
         }
      })
      settransaction(trans)
      setproduct(product)
   }


   const fetchinventory = async () => {
      setloading(true)
      try {

         await axios.get(getinventory, {
            headers: { Authorization: `Bearer ${acess_token}` }
         })

            .then(response => {



               setinventory(response.data.data)
               
               console.log("data", inventory)
               //console.log("data length", parties.length)
               seterror("")
               //console.log("data", response.data.data)


               setloading(false)

            }).catch(error => {
               console.log("error", error)
               if (error.response.data.message !== "No inventory found") {
                  seterror(error.response.data.message)
               } else {
                  setinventory([])
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

      const fetchdata = async () => {
         setloading(true)
         try {

            await axios.get(getpurchase, {
               headers: {
                  "Authorization": `Bearer ${acess_token}`
               }
            })

               .then(response => {


                  setpurchase(response.data.data)
                  setLeng(response.data.data.length)
                  caclculate(response.data.data)
                  console.log("data", response.data.data)
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

      fetchinventory()




   }, [reloadData])







   const [cardvisible, setcardvisible] = useState(false)
   const { register, handleSubmit, setValue } = useForm({ 'paymentstatus': ['pending', 'completed'] });

   const create = (data, event) => {
      console.log("check", data);

      if (update) {

         const action = event.nativeEvent.submitter.value;

         if (action === 'save') {
            // Perform save action
            console.log('Save button clicked');

            data.unitprice = Number(data.unitprice)
            data.quantity = Number(data.quantity)

            console.log("save2id",id);


            setcardvisible(!cardvisible)
            try {
               axios.put(`${updatepurchase}/${id}`, data, {
                  headers: { Authorization: `Bearer ${acess_token}` }
               })
                  .then(response => {
                     console.log("save2",response)
                     setReloadData(!reloadData)
                  })
                  .catch(error => {
                     console.log("error", error)
                     seterror(error.response.data.message)
                  }).finally(()=>{
                     setValue('productname', "");
                     setValue('quantity', "");
                     setValue('productid', "");
                     setValue('withwhom', "");
                     setValue('unitprice', "");
                     setValue('paymentstatus', "");
                     setupdate(!update)
                     
                     setid("")

                  })
            } catch (error) {
               console.log("error", error)
               seterror(error.message)
            }


         } 
      } else {



         const action = event.nativeEvent.submitter.value;

         if (action === 'save') {
            // Perform save action
            console.log('Save button clicked');

            data.unitprice = Number(data.unitprice)
            data.quantity = Number(data.quantity)

            console.log(data);


            setcardvisible(!cardvisible)
            try {
               axios.post(postpurchase, data, {
                  headers: { Authorization: `Bearer ${acess_token}` }
               })
                  .then(response => {
                     //console.log(response)
                     setReloadData(!reloadData)
                  })
                  .catch(error => {
                     console.log("error", error)
                     seterror(error.response.data.message)
                  })
            } catch (error) {
               console.log("error", error)
               seterror(error.message)
            }


         } else if (action === 'saveAddInventory') {

            data.unitprice = Number(data.unitprice)
            data.quantity = Number(data.quantity)
            // Perform save and add to inventory action

            console.log('Save and Add to Inventory button clicked');

            try {
               axios.post(postpurchase, data, {
                  headers: { Authorization: `Bearer ${acess_token}` }
               })
                  .then(response => {
                     //console.log(response)
                     setReloadData(!reloadData)
                  })
                  .catch(error => {
                     console.log("error", error)
                     seterror(error.response.data.message)
                  })
            } catch (error) {
               console.log("error", error)
               seterror(error.message)
            }


            const inventory = {
               productname: data.productname,
               quantity: data.quantity,
               productid: data.productid,
               unitprice: data.unitprice,
               minstock: 1
            }

            console.log(inventory);

            setcardvisible(!cardvisible)
            try {
               axios.post(postinventory, inventory, {
                  headers: { Authorization: `Bearer ${acess_token}` }
               })
                  .then(response => {
                     console.log(response)
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

      // Common logic for both actions



   }

   const togglecard = () => {
      setcardvisible(!cardvisible)
      console.log(cardvisible)
      //alert("button clicked")
      setValue('productname', "");
      setValue('quantity', "");
      setValue('productid', "");
      setValue('withwhom', "");
      setValue('unitprice', "");
      setValue('paymentstatus', "");
      setupdate(!update)
      
      setid("")
   }



   const deletepurchase = (id) => {
      console.log("id", id)
      try {
         axios.delete(`${deltepurchase}/${id}`, {
            headers: { Authorization: `Bearer ${acess_token}` }
         })
            .then(response => {
               console.log(response)
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

   const showFormWithExistingData = (purchase) => {
      // togglecard()
      setValue('productname', purchase.productname);
      setValue('quantity', purchase.quantity);
      setValue('productid', purchase.productid);
      setValue('withwhom', purchase.withwhom);
      setValue('unitprice', purchase.unitprice);
      setValue('paymentstatus', purchase.paymentstatus);
      setupdate(!update)
      setcardvisible(!cardvisible)
      setid(purchase._id)
   };


   return (
      <div>
         {loading ? (
            <div>
               <h1 className="text-center">Loading...</h1>
            </div>
         ) : (
            <div>
               <h1 className="text-center p-2 text-red-600">{error}</h1>

               {purchase.length == 0 ? (
                  <div>
                     <div className="w-full">
                        <div className={` ${cardvisible ? 'hidden' : 'visible'} flex flex-col justify-center text-center items-center align-middle content-center mt-24 `}>
                           <h1 className=" text-justify text-gray-700 text-2xl font-bold">Nothing To Show</h1>
                           <p className=" text-justify text-gray-500 text-base mb-2">Manage Your Purchases Here</p>
                           <button onClick={togglecard} className="bg-orange-500 text-white px-4 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Add Your 1st Purchase here >"} </button>
                        </div>


                        <div className={` ${cardvisible ? 'visible' : 'hidden'}  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`} >

                           <div className="flex flex-row items-center justify-between">

                              <div>
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Purchase</h1>
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

                                    <Input2 placeholder="Vendor" lable="Vendor" type="text" className="p-5" {...register("withwhom", {
                                       required: true
                                    })} />
                                 </div>

                                 <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                                 <div className="flex flex-row flex-wrap ">
                                    <Input2 placeholder="Unitprice" lable="Unitprice" type="number" className="p-5" {...register("unitprice", {
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
                                    <button type="submit" name="action" value="save" className="bg-blue-500 text-white px-4 mx-5 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                                       Save
                                    </button>
                                    <button type="submit" name="action" value="saveAddInventory" className="bg-blue-500 text-white px-4 mx-5 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                       Save and Add to Inventory
                                    </button>
                                 </div>
                              </form>

                           </div>
                        </div>

                     </div>
                  </div>
               ) : (


                  <div>
                     <div className="w-full">

                        <div className={` ${cardvisible ? 'visible' : 'hidden'}  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`} >

                           <div className="flex flex-row items-center justify-between">

                              <div>
                                 <h1 className=" p-5 text-gray-700 text-lg ">Add Purchase</h1>
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

                                    <Input2 placeholder="Vendor" lable="Vendor" type="text" className="p-5" {...register("withwhom", {
                                       required: true
                                    })} />
                                 </div>

                                 <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                                 <div className="flex flex-row flex-wrap ">
                                    <Input2 placeholder="Unitprice" lable="Unitprice" type="number" className="p-5" {...register("unitprice", {
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
                                    <button type="submit" name="action" value="save" className="bg-blue-500 text-white px-4 mx-5 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                                       {update ? "Update" : "Save"}
                                    </button>

                                    {
                                          !update ? ( 

                                             <button type="submit" name="action" value="saveAddInventory" className="bg-blue-500 text-white px-4 mx-5 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                        Save and Add to Inventory
                                    </button>
                                          ) : null

                                    }
                                    
                                 </div>
                              </form>

                           </div>
                        </div>


                        <div className={`${cardvisible ? 'hidden' : 'visible'}`}>
                           <div className="w-full flex flex-col flex-wrap  bg-gray-200">

                              <div className="m-2 bg-white rounded-sm shadow-md p-5">


                                 <h1 className="text-justify text-gray-900 text-xl font-normal">This Month Purchase Data: <span className="text-justify text-gray-700 text-base"> {`${leng} Transaction Made this Month`}</span> </h1>

                                 <div className="flex flex-row flex-wrap justify-start">

                                    <div className="bg-red-300 shadow-md rounded-lg relative p-3 m-3">

                                       <p className="text-justify text-gray-900 text-base font-semibold">Total Product Purchased</p>


                                       <p className="text-justify text-gray-900 text-base font-semibold">{`${product}`}</p>
                                    </div>

                                    <div className="bg-green-300 shadow-md rounded-lg relative p-3 ml-10 m-3">
                                       <p className="text-justify text-gray-900 text-base font-semibold">Total Transaction Value</p>
                                       <p className="text-justify text-gray-900 text-base font-semibold">{`Rs.${transaction}`}</p>
                                    </div>
                                 </div>

                              </div>

                           </div>





                           <div className="w-full flex flex-col flex-wrap  bg-gray-200">

                              <div className="mx-2 mb-2 bg-white rounded-sm shadow-md p-5">





                                 <div class="flex justify-between items-center mb-4">
                                    <h2 class="text-lg font-semibold">Purchase Details</h2>
                                    <div class="flex items-center">
                                       <svg class="w-[27px] h-[27px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                          <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                       </svg>


                                       <button onClick={togglecard} class="text-gray-600 text-sm ml-1">Add Purchase</button>
                                    </div>
                                 </div>

                                 <div class="overflow-x-auto">
                                    <table className="table-fixed w-full border-collapse border border-gray-200">
                                       <thead>
                                          <tr>
                                             <th className="px-4 py-2 w-1/5 text-start">S.No</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Product Name</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Vendor</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Quantity</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Unit Price</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Pyament Status</th>
                                             <th className="px-4 py-2 w-1/5 text-start">Action</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {purchase.map((data, index) => (
                                             <tr key={data._id}>
                                                <td className="px-4 py-2 w-1/5 text-start">{index}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.productname}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.withwhom}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{data.quantity}</td>
                                                <td className="px-4 py-2 w-1/5 text-start">{ data.unitprice}</td>

                                                <td className={`px-4 py-2 w-1/5 text-start ${data.paymentstatus === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                                                   {data.paymentstatus}
                                                </td>

                                                <td className="px-4 py-2 w-1/5 text-center">

                                                   <div className="flex flex-row flex-wrap space-x-1">

                                                      <div onClick={() => showFormWithExistingData(data)}>
                                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                         </svg>
                                                      </div>

                                                      <div onClick={() => deletepurchase(data._id)}>
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


else if (action === 'saveAddInventory') {


            
            data.unitprice = Number(data.unitprice)
            data.quantity = Number(data.quantity)
            // Perform save and add to inventory action

            console.log('Save and Add to Inventory button clicked');
            setcardvisible(!cardvisible)
            try {
               axios.put(`${updatepurchase}/${id}`, data, {
                  headers: { Authorization: `Bearer ${acess_token}` }
               })
                  .then(response => {
                     //console.log(response)
                     setReloadData(!reloadData)
                  })
                  .catch(error => {
                     console.log("error", error)
                     seterror(error.response.data.message)
                  }).finally(()=>{
                     setValue('productname', "");
                     setValue('quantity', "");
                     setValue('productid', "");
                     setValue('withwhom', "");
                     setValue('unitprice', "");
                     setValue('paymentstatus', "");
                     setupdate(!update)
                     
                     setid("")

                  })
            } catch (error) {
               console.log("error", error)
               seterror(error.message)
            }


            const invr = {
               productname: data.productname,
               quantity: data.quantity,
               productid: data.productid,
               unitprice: data.unitprice,
               minstock: 1
            }

            console.log(inventory._id);

            const inventoryid = inventory.find((data)=>data.productname === data.productname)._id
            console.log("inventoryid",inventoryid)
            console.log("inventory",inventory)

            
            try {
               axios.put(`${updateinventory}/${inventoryid}`, invr, {
                  headers: { Authorization: `Bearer ${acess_token}` }
               })
                  .then(response => {
                     console.log(response)
                     setReloadData(!reloadData)
                     seterror("")
                  })
                  .catch(error => {
                     console.log("error", error)
                     seterror(error.response.data.message)
                  }).finally(()=>{
                     setValue('productname', "");
                     setValue('quantity', "");
                     setValue('productid', "");
                     setValue('withwhom', "");
                     setValue('unitprice', "");
                     setValue('paymentstatus', "");
                     setupdate(!update)
                     
                     setid("")

                  })
            } catch (error) {
               console.log("error", error)
               seterror(error.message)
            }
         }*/



         