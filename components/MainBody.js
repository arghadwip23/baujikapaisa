import {React,useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function MainBody() {


//use sattes
const [inputname,setName] = useState();
const [upi,setUpi] = useState("");
const [number,setNumber] = useState("");

const params = useSearchParams();
let valueOfq = params.get("a")||"agl";

const MySwal = withReactContent(Swal);

// get the text
const textValue = {
    agl:{
        img:"/agl.png",
        title : "Angel One",
        ruppe : 100
    },
    wzo:{
        title:'Winzo',
        ruppe: 39,
        img:"/wzo.png"
    },
    cdx:{
        title:"Coin DCX",
        ruppe:15,
        img:"/CoinDCX.png"

    }
}
//functuion to check upi id
function isValidUPI(upi) {
    // Regular expression to validate UPI ID format (user@bank)
    const upiRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+$/;
    return upiRegex.test(upi);
}


//function to check thwe validation oof mobile number
function validateMobileNumber(number) {
    // Regular expression to match exactly 10 digits where the first digit is >= 5
    const regex = /^[6-9]\d{9}$/;

    // Test the number with the regex
    if (regex.test(number)) {
        return true;  // Valid mobile number
    } else {
        return false;  // Invalid mobile number
    }
}

//functuin handle the submission
const handleClick = async()=>{
    if (isValidUPI(upi)&& inputname && validateMobileNumber(number)) {
        let data = {
            name:inputname,
            upiid:upi,
            number:number,
            app: valueOfq 
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
    }else{
        Swal.fire({
            icon:"warning",
            text:"please enter valid name and upi id"
        })
    }
       
    }
    
    
  return (
    <div className=' text-center p-10 justify-center items-center rounded bg-black flex flex-col min-h-2/3 w-90'>
        
    <h1 className='text-xl mt-10 text-white'>
        Download {textValue[valueOfq]["title"]}
    </h1>
    <h5 className='text-gray-500'>get {textValue[valueOfq]["ruppe"]} rupees instant</h5>
    <Image width={200} height={200} src={textValue[valueOfq]["img"]}/>

    <div className='text-left  mx-auto my-10'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" id="first_name" onChange={(event)=>{setName(event.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required />
    </div>
    <div className='text-left mx-auto  my-1'>
        <label htmlFor="upi" className="block mb-2 text-sm font-medium text-black dark:text-white">upi id</label>
        <input type="text" id="upi" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter upi id" required  onChange={(event)=>{setUpi(event.target.value)}}/>
        <div className='text-left  mx-auto my-10'>
        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number</label>
        <input type="number" id="number" onChange={(event)=>{setNumber(event.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your number" required />
    </div>
        <button type="button" className="py-2.5 px-5 mx-auto my-10 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleClick}>Let&apos;s Go</button>
    </div>
     </div>
  )
}
