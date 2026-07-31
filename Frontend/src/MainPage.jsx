import React, { useEffect } from 'react'
import logo from './assets/LEKHA JOKHA.png'
import { Link, useNavigate } from 'react-router'
export default function MainPage() {

window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    
    // Chrome requires returnValue to be set.
    event.returnValue = '';
});

  let name=localStorage.getItem('name')
  let navigate=useNavigate();

useEffect(()=>{
  if(!name){
    navigate('/')
  }
},[])
   const handleLogout=()=>{
localStorage.removeItem('token')
localStorage.removeItem('name')
navigate('/')
   }
  return (
   
    <>
    
      <div className="Main flex flex-col items-center gap-5 max-sm:gap-7 p-2 max-sm:p-3">
        <div className='w-full flex justify-between '>
         
      <button onClick={handleLogout} className='cursor-pointer py-2 text-xl max-md:text-lg max-md:py-1 px-3 rounded-xl bg-red-500 text-white'>Logout</button>
    </div>
       <img  src={logo} alt="" style={{width:'200px'}}/>
        <h1 className='text-3xl max-lg:text-2xl font-medium text-red-400'>Hello {name}</h1>
        <div className="functional flex flex-col items-center justify-around rounded-xl h-70 max-sm:h-50 w-3/6 max-lg:w-4/6 max-sm:w-full p-3 bg-gradient-to-r from-emerald-400 to-cyan-400">
         <Link  className='w-5/6  text-center py-3 text-3xl max-md:text-2xl max-sm:text-xl hover:bg-black hover:text-white font-medium  rounded-xl bg-white text-black cursor-pointer' to={'/Store'} ><button className='cursor-pointer'>Store Transaction</button> </Link> 
          <Link  className='w-5/6 text-center py-3 text-3xl max-md:text-2xl max-sm:text-xl hover:bg-black hover:text-white font-medium  rounded-xl bg-white text-black cursor-pointer' to={'/View'} ><button className='cursor-pointer'>View Transaction</button> </Link> 
        </div>

      </div>
    </>
  )
}
