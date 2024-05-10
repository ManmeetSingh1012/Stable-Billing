import { forwardRef ,useId } from "react";

// here ...porps will recieve the props that we havent declared in the Input component like : register (passed by hook form) ,it will take all the remainigs.
// ref : provide component node with ref to the parent component and parent can use to access the child component and can apply functionaliyt like focous etc (will be passd to ref).
const Input = forwardRef((
   {
   lable="",
   placeholder,
    type = "text",
    className = "",
    ...props
   }, ref) => {


      const id = useId();

      return (
         <>

      
      

      
      <div class="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
      <label htmlFor= {id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
      <input  class="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
       id={id} placeholder= {placeholder} type= {type} {...props} ref={ref} />
    </div>
         </>
      )



      

});

export default Input;