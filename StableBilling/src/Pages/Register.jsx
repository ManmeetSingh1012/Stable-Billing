import Input from "../Components/input.component";
import { useRef, useState } from "react";
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Register() {


   const [error, setError] = useState("")
   const navigate = useNavigate()
   // register will be passed as props to the input component and it will be used to register the input field with the hook form.
   const { register, handleSubmit } = useForm();

   const [toogle , setoogle] = useState(false)
   const signupurl = "http://localhost:4000/api/v1/user/registerbusiness"

   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMwOWY2NWE3MDExNjA0ODI5NjM0MDQiLCJlbWFpbCI6Im1hbm1lZXRzaW5naG5zc0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1hbm1lZXQiLCJpYXQiOjE3MTQ0NjI1NjYsImV4cCI6MTcxNDU0ODk2Nn0.Zhg0tzBnOQj8rBNnwN_qA-nmAXyZpjwt10shs8kIeag'
   const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

    const toogling = ()=>{
        setoogle(!toogle)
    }

    const create = (data) => {

        
        console.log(data);
        toogling()
        setError("")
        

        
        try{
            axios.post(signupurl, data,
               config)
            .then(response => {

                setoogle(!toogle)
                console.log(response)
                navigate('/Landing')
            })
            .catch(error => {
               
                console.log("error",error)

                toogling()
                setError(error.message)
            })
        }catch(error)
        {
            console.log("error",error)
            toogling()
            setError(error.message)
        }
        

        

    }

   return (



      <div class="mx-auto my-10 max-w-md rounded-xl border px-4 py-10 text-gray-700 shadow-lg sm:px-8">

         <div class="mb-16 flex justify-between">
            <span class="font-bold"><span class="inline-block h-3 w-3 bg-orange-600"></span> StableBilling</span>

         </div>

         <p class="mb-5 text-3xl font-medium">Register Your Business</p>

         <span className="mb-6 text-sm text-center text-red-700">{`${error}`}</span>

         <div class="mb-6">
            <form className='content-center' onSubmit={handleSubmit(create)}>
               <div className='space-y-5'>
                  <Input
                     label="Business Name"
                     placeholder="Business Name"
                     {...register("businessname", {
                        required: true,
                     })}
                  />
                  <Input
                     label="Business Type"
                     placeholder="Business Type"
                     type="text"
                     {...register("businesstype", {
                        required: true

                     })}
                  />

                  <Input
                     label="GST No"
                     placeholder="GST No "
                     type="text"
                     {...register("gstno", {
                        required: true
                     })}
                  />


                  <Input
                     label="Business Adress"
                     placeholder="Business Adress"
                     type="text"
                     {...register("address", {
                        required: true

                     })}
                  />

                  <Input
                     label="Business Phone No"
                     type="number"
                     placeholder="Business Phone No"
                     {...register("phoneno", {
                        required: true,
                     })}
                  />
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300" type="submit" >
                  <div className="flex flex-row">
                           
                        <div class={` ${toogle ? 'visible' :'hidden' } text-center mx-2`}>
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-5 h-5  text-gray-200 animate-spin dark:text-orange-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <span>Register</span>
                           </div>
                  </button>
               </div>
            </form>
         </div>

      </div>

   )



}