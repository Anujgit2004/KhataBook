import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import logo from './assets/LEKHA JOKHA.png'
import { useContext } from 'react';
import { UserContext } from './App';
export default function Login() {
 let Apis=useContext(UserContext)
 let [spin,setspin]=useState(false)
 console.log(Apis)
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
   setspin(true)
e.preventDefault();
if(input.email==''||input.password==''){
    alert('All fields are required to be filled')
    }
    else if(!input.email.includes('@gmail.com')){
      alert('Enter proper email address')
    }
    else{
let response=await axios.post(`${Apis}/auth/Login`,input)
if(response.data.message){
alert(response.data.message)
}
else{
      localStorage.setItem('token',response.data.data)
  localStorage.setItem('name',response.data.user.name)
}

}

let gettoken=localStorage.getItem('token');
if(gettoken){
     setinput({
   email:'',
        password:''  
})
setspin(false)
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
        <button className={`border-2 w-2/6 py-1 ${spin?'hidden':''} max-sm:py-0 rounded-xl text-lg cursor-pointer hover:bg-black hover:text-white hover:border-none`}>Submit</button>
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
      <div className="signinfo flex items-center gap-3">
        <p className='text-xl max-sm:text-lg'>Not Registerd Yet?</p>
      <Link to={'/Signup'}> <button className='border-2 px-2 max-sm:text-sm rounded-lg cursor-pointer hover:bg-black hover:text-white hover:border-none'>SignUp</button></Link> 
      </div>
    </div>
    </div>
   
    
    </>
  )
}
