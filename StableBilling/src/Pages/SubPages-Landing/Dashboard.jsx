import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


import axios from "axios";

import { useSelector } from "react-redux";

import { getsale, postsale, getinventory, getexpense ,getparties_url } from "../../constant/const";


import { useEffect, useState } from "react";
import DashboardSale from '../../Components/dashboard/dashboardsale';
import DashboardGet from '../../Components/dashboard/dashboardget';
import DashboardPay from '../../Components/dashboard/dashboardpay';
import DashboardExpense from '../../Components/dashboard/dashboardexpense';
import Dashboardstock from '../../Components/dashboard/dashboardstock';
import exp from 'constants';
export default function Dashboard() {


   const [sale, setsale] = useState([])
   const [error, seterror] = useState("")
   const [inventory, setinventory] = useState([])
   const [loading, setloading] = useState(true)

   const [leng, setLeng] = useState(0)
   const [lengthinventory, setlengthinventory] = useState(0)
   const [expense, setexpense] = useState([])
   const [parties,setparties] = useState([])

   const acess_token = useSelector((state) => state.auth.accessToken);

   useEffect(() => {


      const fetchinventory = async () => {


         setloading(true)
         try {

            await axios.get(getinventory, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })

               .then(response => {



                  setinventory(response.data.data)
                  setlengthinventory(response.data.data.length)

                  console.log("data", inventory)
                  //console.log("data length", parties.length)
                  seterror("")
                  console.log("datainvr", response.data.data)


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

                  //console.log("data",parties)
                  //console.log("data length", parties.length)

                  console.log("data", response.data.data)


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


      const fetchexpense = async () => {
         setloading(true)
         try {

            await axios.get(getexpense, {
               headers: {
                  "Authorization": `Bearer ${acess_token}`
               }
            })

               .then(response => {


                  setexpense(response.data.data)

                  //caclculate(response.data.data)
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


      const fetchdataparties = async () => {
         setloading(true)
         try {

            await axios.get(getparties_url, {
               headers: { Authorization: `Bearer ${acess_token}` }
            })

               .then(response => {


                  setparties(response.data.data)
                  //setLeng(response.data.data.length)
                  //caclculate(response.data.data)
                  //console.log("data",parties)
                  //console.log("data length", parties.length)

                  console.log("dataparties", response.data.data)


                  setloading(false)

               }).catch(error => {
                  console.log("error", error)
                  seterror(error.message)
                  setparties([])
                  setloading(false)
               })

         } catch (error) {
            console.log("error", error)
            seterror(error.message)
            setloading(false)
         }
      }

      fetchdataparties()




      fetchdata()

      fetchinventory()

      fetchexpense()




   }, [])








   console.log("sale", sale)


   if (inventory.length === 0 || sale.length === 0) {


      return (

         <div>



            <div className={`  flex flex-col justify-center text-center items-center align-middle content-center mt-24 `}>
               <h1 className=" text-justify text-gray-700 text-2xl font-bold">Nothing To Show</h1>
               <p className=" text-justify text-gray-500 text-base mb-2">First Add the Data to see the dashboard</p>
            </div>
         </div>
      )

   } else {
      return (


         <div className=" w-fill bg-gray-100 p-2">

            <div className=' w-full flex flex-col'>

               <div className='flex flex-row w-full'>

                  <DashboardSale data={sale} />
                  <Dashboardstock inventory={inventory}/>
               </div>


               <div className='flex flex-row '>
                  <DashboardGet parties={parties} />
                  <DashboardPay parties={parties} />
                  <DashboardExpense expensedata={expense} />

               </div>

            </div>



         </div>
      )
   }

}


/*
<div className="flex flex-col justify-center text-center items-center align-middle content-center mt-20">
            <h1 className=" text-gray-700 text-2xl font-bold mb-1">Welcome to Stable Billing</h1>
            <p className=" text-gray-500 text-sm mb-8">You Dont Have Enough Data To show Something Here</p>
         
         </div>
*/