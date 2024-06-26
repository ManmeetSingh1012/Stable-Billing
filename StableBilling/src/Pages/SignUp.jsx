import Input from "../Components/input.component";
import { useRef, useState } from "react";
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { setLogin } from "../features/dataslice";

import {  useDispatch } from "react-redux";





export default function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState("")
    const signupurl = "http://localhost:4000/api/v1/user/signup"

    // register will be passed as props to the input component and it will be used to register the input field with the hook form.

    const { register, handleSubmit , formState: { errors } } = useForm();
    const [toogle , setoogle] = useState(false)

    const toogling = ()=>{
        setoogle(!toogle)
    }

    const create = (data) => {

        
        console.log(data);
        setoogle(!toogle)
        setError("")

        data.premium = false
        

        
        try{
            axios.post(signupurl, data)
            .then(response => {

                
                console.log(response.data.user)

                console.log("token",response.data.user.acessToken)
                const token = response.data.user.acessToken

                dispatch(setLogin(token))
                //dispatch(setLogin(true))

                navigate('/Register')
            })
            .catch(error => {
               
                console.log("error",error)

                if(error.response.data.message )
                {
                    setError(error.response.data.message)
                }else{
                    setError(error.message)
                }
                setError(error.response.data.message)
            }).finally(()=>{
                setoogle(!toogle)
            })
        }catch(error)
        {
            console.log("error",error)
            setoogle(!toogle)
            setError(error.message)
        }
        

        

    }

   





    return (



        <div class="mx-auto my-10 max-w-md rounded-xl border px-4 py-10 text-gray-700 shadow-lg sm:px-8">

            <div class="mb-16 flex justify-between">
                <span class="font-bold"><span class="inline-block h-3 w-3 bg-orange-600"></span> StableBilling</span>
                <span class="">Have account? <Link to="/SignIn" class="font-medium text-orange-600 hover:underline">Log in</Link></span>
            </div>

            <p class="mb-5 text-3xl font-medium">SignUp & Manage your Business with us!</p>
            <p class="mb-6 text-sm">Efficiency meets accuracy: Master your business with our billing and inventory app.</p>

            <span className="mb-6 text-sm text-center text-red-700">{`${error}`}</span>
            <div class="mb-6">
                <form className='content-center' onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>


                        <div>

                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                {...register("username", {
                                    required: true, message: "Full Name is required"
                                })}


                            />

                            {errors.username && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />


                            {errors.username && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true, message: "Password is required"
                                })}
                            />


                            {errors.username && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300" type="submit" >

                            <div className="flex flex-row">

                                <div class={` ${toogle ? 'visible' : 'hidden'} text-center mx-2`}>
                                    <div role="status">
                                        <svg aria-hidden="true" class="inline w-5 h-5  text-gray-200 animate-spin dark:text-orange-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <span>Create Account</span>
                            </div>



                        </button>
                    </div>
                </form>
            </div>

            <p class="">By signing up you are agreeing to our <a href="#" class="whitespace-nowrap font-medium text-gray-900 hover:underline">Terms and Conditions</a></p>
        </div>

    )



}



/* add this when to move to next screen

<Link
                                to="/login"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
*/



