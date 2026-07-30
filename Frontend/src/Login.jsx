import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import logo from './assets/LEKHA JOKHA.png'
export default function Login() {
 
    const[loginD,setloginD]=useState();
    const[input,setinput]=useState({
        email:'',
        password:''
    })
let navigate= useNavigate()
    const handleinput=(e)=>{
let prod={...input}
let getvalue=e.target.value;
let getname=e.target.name;
prod[getname]=getvalue;
setinput(prod)
    }
   
const handleSubmit=async(e)=>{
e.preventDefault();
if(input.email==''||input.password==''){
    alert('All fields are required to be filled')
    }
    else if(!input.email.includes('@gmail.com')){
      alert('Enter proper email address')
    }
    else{
let response=await axios.post('http://localhost:7000/auth/Login',input)
if(response.data.message){
alert(response.data.message)
}
else{
  localStorage.setItem('token',response.data.data)
  localStorage.setItem('name',response.data.user.name)
}
setinput({
   email:'',
        password:''  
})
}

let gettoken=localStorage.getItem('token');
if(gettoken){
navigate('/Main')
}
}

  return (
    <>
    <div className="loginpage w-full flex flex-col max-sm:gap-5 items-center justify-center max-sm:p-3">
 <img src={logo} alt="" className='w-[300px] max-lg:w-[250px] max-sm:w-[200px]'/>
    <div className="loginComponent flex flex-col gap-5 max-sm:gap-8 items-center w-3/6 max-lg:w-4/6 max-md:w-5/6 max-sm:w-full border-3 border-red-400 py-4 rounded-xl">
        <h1 className='text-3xl max-sm:text-2xl font-medium'>Login Yourself</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-4/6 max-sm:w-5/6 items-center p-2 '>
        <input className='border-2 border w-full py-2 rounded-xl px-1 text-xl max-sm:text-lg max-sm:py-1 ' type="email" onChange={handleinput} name='email' value={input.email} placeholder='Email'/>
        <input className='border-2 w-full py-2 rounded-xl px-1 text-xl max-sm:text-lg max-sm:py-1 ' name='password' onChange={handleinput} value={input.password} type="password" placeholder='Password'/>
        <button className='border-2 w-2/6 py-1 max-sm:py-0 rounded-xl text-lg cursor-pointer hover:bg-black hover:text-white hover:border-none'>Submit</button>
      </form>
      <div className="signinfo flex items-center gap-3">
        <p className='text-xl max-sm:text-lg'>Not Registerd Yet?</p>
      <Link to={'/Signup'}> <button className='border-2 px-2 max-sm:text-sm rounded-lg cursor-pointer hover:bg-black hover:text-white hover:border-none'>SignUp</button></Link> 
      </div>
    </div>
    </div>
   
    
    </>
  )
}
