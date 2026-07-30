import React, { useState } from 'react'
import logo from './assets/LEKHA JOKHA.png'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './App';
export default function Store() {
let Api=useContext(UserContext)
const[data,setdata]=useState({
    Cname:'',
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:''
})
let navigate=useNavigate()
const handleinput=(e)=>{
    let prod={...data}
let getvaue=e.target.value;
let getname=e.target.name;
prod[getname]=getvaue;
setdata(prod)
}

const handleSubmit=async(e)=>{
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
        <button className='bg-white  w-2/6 p-2 max-sm:p-1 rounded-xl text-2xl max-sm:text-xl hover:bg-green-500 cursor-pointer hover:text-white'>Store</button>
      </form>
    </div>
  )
}
