import { Outlet , Link , Navigate } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
import {ChartArea ,ReceiptIndianRupee , Users ,Flame ,MessageSquareDot, ClipboardList , BadgeIndianRupee , BaggageClaim , UserRoundPen ,TicketSlash,BookOpenText } from 'lucide-react'


export default function Landing() {

   const navigate = useNavigate()
   return (
      <div className='w-full'>

         
         <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
               <Link  to="/" class="flex items-center ps-2.5 mb-5">

                  <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Stable Billing</span>
               </Link>
               <ul class="space-y-2 font-normal text-xs">
                  <li>
                     <Link to="/Landing" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <ChartArea />
                        <span class="ms-3">Dashboard</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/Landing/QuickBilling" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                       
                     <ReceiptIndianRupee/>
                        <span class="flex-1 ms-3 whitespace-nowrap">Quick Billing</span>

                     </Link>
                  </li>

                  <li>
                     <Link to="/Landing/Parties" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <Users />
                        <span class="flex-1 ms-3 whitespace-nowrap">Parties</span>
                     </Link>
                  </li>




                  <li>
                     <Link to="/Landing/Inventory" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <ClipboardList />
                        <span class="flex-1 ms-3 whitespace-nowrap">Inventory</span>
                     </Link>
                  </li>

                  <li>
                  <Link to="/Landing/Sales" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <BadgeIndianRupee />

                        <span class="flex-1 ms-3 whitespace-nowrap">Sales</span>
                     </Link>
                  </li>


                  <li>

                     <Link to="/Landing/Purchase" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <BaggageClaim />

                        
                        <span class="flex-1 ms-3 whitespace-nowrap">Purchase</span>
                     </Link>

                  </li>

                  <li>

                     <Link to="/Landing/Expense" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <TicketSlash />

                        <span class="flex-1 ms-3 whitespace-nowrap">Expense</span>
                     </Link>

                  </li>

                 


               </ul>

               <ul class="pt-4 mt-4 space-y-2 font-normal text-sm border-t border-gray-200 dark:border-gray-700">
                  <li>
                     <Link to="/Landing/Pricing" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                     <Flame />
                        <span class="ms-3">Upgrade to Pro</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/Landing/documentation" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                     <BookOpenText />
                        <span class="ms-3 font-normal text-xs">Documentation</span>
                     </Link>
                  </li>





                  <li>
                     <Link to="/Landing/Profile" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                     <UserRoundPen />

                        <span class="ms-3 font-normal text-xs">Profile</span>
                     </Link>
                  </li>

                  <li>
                  <Link to="/Landing/Feedback" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <MessageSquareDot />

                        <span class="flex-1 ms-3 whitespace-nowrap">Help & Feedback</span>

                     </Link>
                  </li>

                  
               </ul>
            </div>
         </aside>



         <div className='ml-48'>
         <Outlet/>

         </div>
         


      </div>
   )
}


/*  <li>
                     <Link to="/Landing/Expense" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-[25px] h-[25px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clip-rule="evenodd" />
                           <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" clip-rule="evenodd" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Expenses</span>

                     </Link>
                  </li>*/