import React ,{useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link , Navigate, useNavigate } from 'react-router-dom';
import toast , { Toaster } from 'react-hot-toast';


import { setLogin } from '../features/dataslice';
import { useSelector , useDispatch } from 'react-redux';

function Intro() {

  
   
   //display block will show item in column

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();

   const toggleMenu = () => {
       setShowMenu(!showMenu);
   };

   const navigateTo = () => {

      
      status ?  navigate('/Landing') :  navigate('/SignUp');
     
   }

   const token = useSelector((state) => state.auth.accessToken);
   const status = useSelector((state) => state.auth.login)

   console.log("status",status)
   console.log("token",token)


   return (

      <div className="w-full ">


         <header className="sticky top-0 bg-white shadow-sm">
            <div className="flex flex-row flex-wrap justify-between items-center w-5/6 mx-auto">
               <div className="text-2xl flex flex-row flex-wrap font-semibold p-3">
                  <img src="/src/assets/billing.svg" alt="Logo" />
                  <p className="text-gray-700 ml-2">StableBilling</p>
               </div>
               <div className="sm:hidden">
                  <button
                     onClick={toggleMenu}
                     className="text-gray-600 hover:text-orange-600"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                     </svg>
                  </button>

                  <Toaster />
               </div>
               <nav className={`sm:flex ${showMenu ? 'inline'  : 'hidden'} sm:flex-row flex-wrap text-sm font-normal text-gray-600`}>
                  <ul className="flex flex-col sm:flex-row flex-wrap">
                     <li className="p-3 hover:text-orange-600">

                     <Link to="/">Home</Link>
                    
                     </li>
                     <li className="p-3 hover:text-orange-600">
                     <a href="#">About</a>
                     </li>
                     <li className="p-3 hover:text-orange-600"><a href="#">Services</a></li>
                     <li className="p-3 hover:text-orange-600"><a href="#">Contact</a></li>
                     {
                        status ? <li className="p-3 hover:text-orange-600">
                        <Link to="/Landing">Dashboard</Link>
                        </li> :<li className="p-3 hover:text-orange-600">
                     <Link to="/SignUp">SignUp</Link>
                     </li>
                     }
                     
                  </ul>
                  
               </nav>
            </div>
         </header>




         <div className="flex items-center justify-center mt-10 w-5/6 mx-auto ">
            <div className="flex flex-wrap w-full">

               <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className=" text-wrap   text-center sm:text-start">
                     <h1 className=" text-gray-700 text-4xl font-bold mb-4"> StableBilling : GST Billing & Inventory Mangement Software in India for Small Businesses</h1>
                     <p className=" text-gray-500 text-sm mb-8">Manage your business professionally with StableBilling. Using the best software for your billing, inventory & accounting needs. Be a part of 1 lakh+ SMEs in India who trust StableBilling.</p>
                     { !status ? <button onClick={ 
                        navigateTo
                     } className="bg-orange-500 text-white px-6 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Join Stable Billing >"} </button>
                   : <button onClick={ 
                        navigateTo
                     } className="bg-orange-500 text-white px-6 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Home Page>"} </button>
                   }
                     </div>
               </div>

               <div className="hidden w-full md:w-1/2 sm:flex items-center justify-center">
                  <img src="/src/assets/hero.png" alt="Big Product Image" class="w-4/5 h-auto "></img>
               </div>
            </div>
         </div>





         <div className="mt-32 bg-gray-50 pt-5 flex flex-col flex-wrap">

            <div className="flex flex-wrap flex-col w-5/6 mx-auto">

               <p className="text-center text-gray-700 text-2xl font-normal mb-2">Master Your Billing Processes</p>
               <p className="text-center text-gray-700 text-3xl font-semibold ">Optimize Your Performance</p>

            </div>


            <div className="flex flex-col  sm:flex-row  items-start sm:justify-between justify-center mt-10  w-5/6 mx-auto">
               <div className="flex sm:justify-start justify-center">
                  <img className="w-full  sm:w-5/6" src="/src/assets/managment.png"></img>
               </div>
               <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className=" text-center sm:text-start text-wrap ">
                     <h1 className=" text-gray-700 text-3xl font-bold mb-4">Easy product management</h1>
                     <p className=" text-gray-500 text-sm mb-8">Effortlessly manage your products or services and pricing with a comprehensive product catalog. Make sales a breeze by optimizing sales strategies with flexible pricing models and the pricing table widget.</p>
                  </div>
               </div>
            </div>



            <div className="flex flex-col  sm:flex-row items-start justify-between mt-20  w-5/6 mx-auto">
               <div className="w-full md:w-1/2 flex items-center justify-center order-2 sm:order-1">
                  <div className=" text-center sm:text-start text-wrap ">
                     <h1 className=" text-gray-700 text-3xl font-bold mb-4">Efficient billing processes</h1>
                     <p className=" text-gray-500 text-sm mb-8">Unleash seamless quotation, invoicing, and expense tracking. Handle projects and timesheets effortlessly, and generate e-invoices for swift and smooth transactions that comply with regional regulations.</p>
                  </div>
               </div>

               <div className="order-1 sm:order-2">
                  <img className="w-5/6 ml-6 " src="/src/assets/billing2.png"></img>
               </div>
            </div>




            <div className="flex flex-col  sm:flex-row items-start justify-between mt-20  w-5/6 mx-auto">
               <div className="">
                  <img className="w-5/6 " src="/src/assets/billing3.png"></img>
               </div>
               <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className=" text-center sm:text-start text-wrap ">
                     <h1 className=" text-gray-700 text-3xl font-bold mb-4">Convenient payment handling</h1>
                     <p className=" text-gray-500 text-sm mb-8">Handle partial and bulk payments flexibly with multiple payment methods and automated reminders. Benefit from secure transactions through payment links and hosted payment pages.</p>
                  </div>
               </div>
            </div>




            <div className="flex flex-col  sm:flex-row items-start justify-between mt-20 w-5/6 mx-auto">
               <div className="w-full md:w-1/2 flex flex-col order-2 sm:order-1">
                  <div className="text-wrap text-center sm:text-start">
                     <h1 className="text-gray-700 text-3xl font-bold mb-4">Manage customer lifecycle</h1>
                     <p className="text-gray-500 text-sm mb-8">Take control of customer accounts, overseeing easy trials, upgrades, cancellations, and reactivations, all while actively managing customer acquisition and ensuring smooth transactions through dunning management.</p>
                  </div>
               </div>
               <div className="order-1 sm:order-2">
                  <img className="w-5/6 ml-6" src="/src/assets/billing4.png" alt="Billing Image" />
               </div>
            </div>

         </div>




         <section class="bg-white dark:bg-gray-800 mt-32">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
               <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                  <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Pricing</h2>
                  <h2 class="mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
                  <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at StableBilling we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
               </div>
               <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

                  <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                     <h3 class="mb-4 text-2xl font-semibold">Starter</h3>
                     <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
                     <div class="flex justify-center items-baseline my-8">
                        <span class="mr-2 text-3xl font-extrabold">Rs.999</span>
                        <span class="text-gray-500 dark:text-gray-400">/month</span>
                     </div>

                     <ul role="list" class="mb-8 space-y-4 text-left">
                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>Genrate E-way Bills</span>
                        </li>
                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>Payment Gateway</span>
                        </li>
                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>Account Size: <span class="font-semibold">1 </span></span>
                        </li>


                     </ul>
                     <a href="#" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</a>
                  </div>

                  <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                     <h3 class="mb-4 text-2xl font-semibold">Company</h3>
                     <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
                     <div class="flex justify-center items-baseline my-8">
                        <span class="mr-2 text-3xl font-extrabold">Rs.1499</span>
                        <span class="text-gray-500 dark:text-gray-400">/month</span>
                     </div>

                     <ul role="list" class="mb-8 space-y-4 text-left">
                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>Quick Billing</span>
                        </li>

                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>Account Size: <span class="font-semibold">5</span></span>
                        </li>
                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>24/7 Customer Service: <span class="font-semibold">24 months</span></span>
                        </li>

                     </ul>
                     <a href="#" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</a>
                  </div>

                  <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                     <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
                     <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
                     <div class="flex justify-center items-baseline my-8">
                        <span class="mr-2 text-3xl font-extrabold">Rs.1999</span>
                        <span class="text-gray-500 dark:text-gray-400">/month</span>
                     </div>

                     <ul role="list" class="mb-8 space-y-4 text-left">
                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>AI Analytics</span>
                        </li>

                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>Account size: <span class="font-semibold">10+</span></span>
                        </li>
                        <li class="flex items-center space-x-3">

                           <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           <span>24/7 Premium support: <span class="font-semibold">36 months</span></span>
                        </li>

                     </ul>
                     <a href="#" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</a>
                  </div>
               </div>
            </div>
         </section>




         <div class="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-3">
            <div class="w-full bg-white border-t border-b border-gray-200 px-5 py-10 md:py-24 text-gray-800">
               <div class="w-full max-w-6xl mx-auto">
                  <div class="text-center max-w-xl mx-auto">
                     <h1 class="text-6xl md:text-6xl font-bold mb-5 text-gray-700">What people <br /> are saying.</h1>
                     <h3 class="text-xl mb-5 font-light">People Are Enjoying Our Product Look Below for the Feedback</h3>
                     <div class="text-center mb-10">
                        <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span class="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                        <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                     </div>
                  </div>
                  <div class="-mx-3 md:flex items-start">
                     <div class="px-3 md:w-1/3">
                        <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                           <div class="w-full flex mb-4 items-center">
                              <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                 <img src="https://i.pravatar.cc/100?img=1" alt=""></img>
                              </div>
                              <div class="flex-grow pl-3">
                                 <h6 class="font-bold text-sm uppercase text-gray-600">Kenzie Edgar | Lead Clerak</h6>
                              </div>
                           </div>
                           <div class="w-full">
                              <p class="text-sm leading-tight"><span class="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>Absolutely love the billing and inventory app! It's made managing our stock and transactions a breeze. The intuitive interface makes it easy for our team to navigate, and the reporting features are incredibly useful for tracking our sales trends. Highly recommend!<span class="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                           </div>
                        </div>
                        <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                           <div class="w-full flex mb-4 items-center">
                              <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                 <img src="https://i.pravatar.cc/100?img=2" alt=""></img>
                              </div>
                              <div class="flex-grow pl-3">
                                 <h6 class="font-bold text-sm uppercase text-gray-600">Stevie Tifft | CTO Upfront Games</h6>
                              </div>
                           </div>
                           <div class="w-full">
                              <p class="text-sm leading-tight"><span class="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>I've been using this billing and inventory app for a few weeks now, and I'm impressed with its functionality. It's helped me streamline my business operations, from managing invoices to keeping track of inventory levels. The customer support team is also very responsive and helpful.<span class="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                           </div>
                        </div>
                     </div>
                     <div class="px-3 md:w-1/3">
                        <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                           <div class="w-full flex mb-4 items-center">
                              <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                 <img src="https://i.pravatar.cc/100?img=3" alt=""></img>
                              </div>
                              <div class="flex-grow pl-3">
                                 <h6 class="font-bold text-sm uppercase text-gray-600">Ritik Patel | CEO Danik Bhaskar</h6>
                              </div>
                           </div>
                           <div class="w-full">
                              <p class="text-sm leading-tight"><span class="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>This billing and inventory app has saved me so much time and effort! With just a few clicks, I can generate invoices, track payments, and monitor my stock levels. <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                           </div>
                        </div>
                        <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                           <div class="w-full flex mb-4 items-center">
                              <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                 <img src="https://i.pravatar.cc/100?img=4" alt=""></img>
                              </div>
                              <div class="flex-grow pl-3">
                                 <h6 class="font-bold text-sm uppercase text-gray-600">Kiran Chawla | Head of Operation Uniliver</h6>
                              </div>
                           </div>
                           <div class="w-full">
                              <p class="text-sm leading-tight"><span class="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>I've tried several billing and inventory apps in the past, but this one stands out for its simplicity and effectiveness. The interface is clean and easy to navigate, and I appreciate the ability to customize my invoices and reports.<span class="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                           </div>
                        </div>
                     </div>
                     <div class="px-3 md:w-1/3">
                        <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                           <div class="w-full flex mb-4 items-center">
                              <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                 <img src="https://i.pravatar.cc/100?img=5" alt=""></img>
                              </div>
                              <div class="flex-grow pl-3">
                                 <h6 class="font-bold text-sm uppercase text-gray-600">Rehman Singh | CTO InstaCart</h6>
                              </div>
                           </div>
                           <div class="w-full">
                              <p class="text-sm leading-tight"><span class="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>As a small business owner, I rely on this billing and inventory app to keep my operations running smoothly.<span class="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                           </div>
                        </div>
                        <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                           <div class="w-full flex mb-4 items-center">
                              <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                 <img src="https://i.pravatar.cc/100?img=6" alt=""></img>
                              </div>
                              <div class="flex-grow pl-3">
                                 <h6 class="font-bold text-sm uppercase text-gray-600">Amrish Sihna | CEO Zerodha</h6>
                              </div>
                           </div>
                           <div class="w-full">
                              <p class="text-sm leading-tight"><span class="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>I started using this billing and inventory app recently, and I'm already seeing improvements in my workflow. It's helped me stay on top of my invoices, track my expenses, and optimize my inventory management.<span class="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap flex-col w-5/6 mx-auto mt-10">

                     <p className="text-center text-gray-700 text-2xl font-normal mb-2">Get Stable Billing Now</p>
                     <p className="text-center text-gray-700 text-2xl font-semibold mb-2">And Elevate your billing experience</p>



                     <div className='flex flex-row flex-wrap mx-auto w-full justify-center'>
                        <button className="bg-orange-500 text-white mx-3 px-6 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Signup"} </button>
                        <button className="mx-3 border border-black text-black hover:border-0 hover:text-white px-6 py-3 rounded-lg  hover:bg-orange-500 transition-colors duration-300">{"Take Demo"} </button>

                     </div>


                  </div>
               </div>
            </div>
         </div>













         <footer class="w-full text-gray-700 bg-gray-50 body-font  shadow-sm">
            <div
               class="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
               <div class="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">

                  <h1 className='font-semibold '>StableBilling</h1>
                  <p class="mt-2 text-sm text-gray-500">Billing,Inventory</p>
                  <div class="mt-4">
                     <span class="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                        <a class="text-gray-500 cursor-pointer hover:text-gray-700">
                           <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              class="w-5 h-5" viewBox="0 0 24 24">
                              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                           </svg>
                        </a>
                        <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                           <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              class="w-5 h-5" viewBox="0 0 24 24">
                              <path
                                 d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                              </path>
                           </svg>
                        </a>
                        <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                           <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                           </svg>
                        </a>
                        <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                           <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                              <path stroke="none"
                                 d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                              </path>
                              <circle cx="4" cy="4" r="2" stroke="none"></circle>
                           </svg>
                        </a>
                     </span>
                  </div>
               </div>
               <div class="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
                  <div class="w-full px-4 lg:w-1/4 md:w-1/2">
                     <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">About</h2>
                     <nav class="mb-10 list-none">
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Company</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Careers</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Blog</a>
                        </li>
                     </nav>
                  </div>
                  <div class="w-full px-4 lg:w-1/4 md:w-1/2">
                     <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Support</h2>
                     <nav class="mb-10 list-none">
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Contact Support</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Help Resources</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Release Updates</a>
                        </li>
                     </nav>
                  </div>
                  <div class="w-full px-4 lg:w-1/4 md:w-1/2">
                     <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Platform
                     </h2>
                     <nav class="mb-10 list-none">
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Terms &amp; Privacy</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Pricing</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">FAQ</a>
                        </li>
                     </nav>
                  </div>
                  <div class="w-full px-4 lg:w-1/4 md:w-1/2">
                     <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Contact</h2>
                     <nav class="mb-10 list-none">
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Send a Message</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">Request a Quote</a>
                        </li>
                        <li class="mt-3">
                           <a class="text-gray-500 cursor-pointer hover:text-gray-900">+91-98761xxxxx</a>
                        </li>
                     </nav>
                  </div>
               </div>
            </div>
            <div class="">
               <div class="container px-5 py-4 mx-auto">
                  <p class="text-sm text-gray-700 capitalize text-center">© 2024 All rights reserved </p>
               </div>
            </div>
         </footer>
      </div>










   )
}


export default Intro;