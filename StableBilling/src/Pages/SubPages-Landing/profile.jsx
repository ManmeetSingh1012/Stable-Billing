import { getuser_url } from "../../constant/const"
import { useState, useEffect } from "react"
import axios from "axios";
import { set } from "react-hook-form";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLogin } from "../../features/dataslice";
export default function Profile() {
    const acess_token = useSelector((state) => state.auth.accessToken);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [created, setcreated] = useState("")
    const [paid, setPaid] = useState(false)
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)


    const dispatch = useDispatch()
    
    const logout = () =>{
        
       
        dispatch(clearLogin())
        navigate("/")
    
    }
    useEffect(() => {

        const fetchdata = async () => {
            setloading(true)
            try {

                await axios.get(getuser_url, {
                    headers: { Authorization: `Bearer ${acess_token}` }
                })

                    .then(response => {

                        console.log(response.data.user)
                        setName(response.data.user.username)
                        setEmail(response.data.user.email)


                        setcreated(response.data.user.createdAt)
                        setPaid(response.data.user.premium)



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




    }, [])


    return (


        <div className="w-full mt-5">
            <div class="bg-white overflow-hidden shadow rounded-lg border max-w-xl mx-auto flex flex-col flex-wrap justify-center">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        User Profile
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        This is  information about the user.
                    </p>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {`${name}`}
                            </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {`${email}`}
                            </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Account created on
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {`${created}`}
                            </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Paid User
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {`${paid}`}
                            </dd>
                        </div>
                    </dl>
                </div>

                <button onClick={ 
                       logout
                     } className="bg-orange-500 w-fit  m-1 text-white px-6 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Logout"} </button>
                   
            </div>
        </div>



    )
}