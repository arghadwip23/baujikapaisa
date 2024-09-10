"use client"

import {React,useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Content() {

const [inputname,setName] = useState();
const [upi,setUpi] = useState();
const MySwal = withReactContent(Swal)
const handleClick = async()=>{

    let data = {
        name:inputname.target.value,
        upiid:upi.target.value
    }
    let a = await fetch("/api/add",{method:"POST",headers:{
        "Content-Type":"application/json",
    },body:JSON.stringify(data),});
    let response = await a.json();
    console.log(response)
    if(response.success){
        MySwal.fire({title:"hurreyh!",
            text:"now you wil be redirected to the playstore",
            icon:"success"
        }).then(()=>{
           window.location.href=response.data;
        })

    }else{
        Swal.fire({
            text:"sorry",
            icon:"error",
            text:"something went wrong"
        })

    }
}
  return (
    <div className='h-2/3 w-2/3 text-center p-4 bg-black rounded'>
        
        <h1 className='text-xl mt-10'>
            Download AngelOne 
        </h1>
        <h5 className='text-gray-500'>get 100 rupees instant</h5>
        <div className='text-left my-10 mx-auto'>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="first_name" onChange={(value)=>{setName(value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John walker" required />
        </div>
        <div className='text-left mx-auto  my-1'>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UPI id</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@xyz" required  onChange={(value)=>{setUpi(value)}}/>
            <button type="button" className="py-2.5 px-5 mx-auto my-10 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleClick}>Let&apos;s Go</button>
        </div>
         </div>
  )
}
