import { forwardRef ,useId } from "react"


const  Input2 = forwardRef((
   {
   lable="",
   placeholder,
    type ,
    className = "",
    ...props
   }, ref
) => {

   const id = useId();


   return (
      <div class={`w-64 ${className}`}>
         <div class="relative w-full min-w-[200px] h-9">
            <input
               class={`peer w-full h-full bg-transparent text-blue-gray-700  font-light outline outline-0 
               focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border
                placeholder-shown:border-gray-400 placeholder-shown:border-t-border-gray-400 border focus:border-2 
                 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-400 
               `}
               id={id} placeholder= " " type= {type} {...props} ref={ref} />
               <label
                  htmlFor= {id} class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[10px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-400 after:border-blue-gray-200 peer-focus:after:!border-gray-400">{lable}
            </label>
         </div>
      </div>
   )
}) 

export default Input2;





