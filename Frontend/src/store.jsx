import React, { useState } from 'react'
import logo from './assets/LEKHA JOKHA.png'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './App';
export default function Store() {
let navigate=  useNavigate()
let [spin,setspin]=useState(false);
   let gettoken=localStorage.getItem('token');
if(!gettoken){
navigate('/')
}
window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    
    // Chrome requires returnValue to be set.
    event.returnValue = '';
});

let Api=useContext(UserContext)
const[data,setdata]=useState({
    Cname:'',
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:''
})

const handleinput=(e)=>{
    let prod={...data}
let getvaue=e.target.value;
let getname=e.target.name;
prod[getname]=getvaue;
setdata(prod)
}

const handleSubmit=async(e)=>{
  setspin(true)
e.preventDefault();
if(data.Cname==''||data.Product==''||data.Qty==''||data.TotalPrice==''||data.Deposit==''){
  alert('All fields are required to be filled')
}
else{
let response=await axios.post(`${Api}/auth/Send`,data)
if(response.data){
    alert('Stored Successfully')
}

setdata({
    Cname:'',
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:''  
})
setspin(false)
navigate('/Main')
}
}

  return (
    <div className='w-full flex flex-col items-center pb-10'>
<img src={logo} alt="" className='w-[300px] max-lg:w-[250px] max-sm:w-[200px]'/>
      <form className='flex flex-col items-center rounded-2xl gap-5 bg-gradient-to-r from-pink-400 to-amber-400  p-4 w-3/6 max-lg:w-4/6 max-md:w-5/6' onSubmit={handleSubmit}>
        <input className='border-none bg-white focus:outline-none focus:ring-0 focus:border-transparent" w-full p-2 max-sm:py-1  rounded-xl text-2xl max-sm:text-lg' type="text" name='Cname' value={data.Cname} placeholder='Company Name' onChange={handleinput}/>
        <input className='bg-white w-full focus:outline-none focus:ring-0 focus:border-transparent p-2 rounded-xl text-2xl max-sm:py-1 max-sm:text-lg' type="text" placeholder='Product Name' name='Product' value={data.Product} onChange={handleinput}/>
        <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-2 rounded-xl text-2xl max-sm:py-1 max-sm:text-lg' type="number" placeholder='Enter Quantity In Kg' name='Qty' value={data.Qty} onChange={handleinput}/>
        <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-2 rounded-xl text-2xl max-sm:text-lg max-sm:py-1' type="number" placeholder='Total Amount'name='TotalPrice' value={data.TotalPrice} onChange={handleinput}/>
        <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-2 rounded-xl text-2xl max-sm:text-lg max-sm:py-1' type="number" placeholder='Deposit Amount' name='Deposit' value={data.Deposit} onChange={handleinput}/>
           <button className={`border-2 w-2/6 py-1 ${spin?'hidden':''} max-sm:py-0 rounded-xl text-lg cursor-pointer hover:bg-black hover:text-white hover:border-none`}>Store</button>
        <div role="status" class={`flex flex-col items-center mt-6 ${spin?'':'hidden'}`}>
   <svg xmlns="http://www.w3.org/2000/svg"
      class="size-8 animate-[spin_0.8s_linear_infinite] fill-blue-600 dark:fill-blue-500" viewBox="0 0 24 24"
      aria-hidden="true">
      <path
         d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
         data-original="#000000" />
   </svg>
   <span class="sr-only">Loading…</span>
</div>
      </form>
    </div>
  )
}
