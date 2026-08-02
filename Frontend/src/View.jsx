import React, { useEffect, useState } from 'react'
import logo from './assets/LEKHA JOKHA.png'
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './App';
import { useNavigate } from 'react-router';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default function View() {
let navigate= useNavigate();
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
let [spin,setspin]=useState(false)
let [spin2,setspin2]=useState(false)
let [spin3,setspin3]=useState(false)
let Api=useContext(UserContext)
let [getid,setid]=useState(0);
let [ids,setids]=useState();
let [Update,setupdate]=useState(false)
let[Add,setAdd]=useState(false);
let Total=0;
let Deposit=0;
let Credit=0;

 
const[Adata,setAdata]=useState({
    Cname:'',
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:''
})

const[Data,setData]=useState({
    Cname:'',
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:'',
    date:''
})
console.log(Data)

let [active,setactive]=useState(true)

    const [data,setdata]=useState({
        Cname:'',
        Product:'',
        Fdate:'',
        Todate:''
    })

    
const[fact,setfact]=useState([])

//to fetch all data
useEffect(()=>{
axios.get(`${Api}/auth/Data`).then((response)=>{setfact(response.data)})
},[])

//to fetch filtered data
useEffect(()=>{
axios.post(`${Api}/auth/Show`,data).then((res)=>{setfact(res.data)})
},[data])


console.log(fact)

//to get data of updated field
const handleInput=(e)=>{
    let prod={...Data}
let getvaue=e.target.value;
let getname=e.target.name;
prod[getname]=getvaue;
setData(prod)
}


//to get filtered field
 let handleinput=(e)=>{
        let prod={...data}
let getname=e.target.name;
let getvaue=e.target.value;
prod[getname]=getvaue;
setdata(prod)
    }



const handleUpdate=(id)=>{
  setid(id)
  setupdate(true)
const getupdatedata=fact.filter((v,i)=>v._id==id)[0]
setData(getupdatedata)
}

//add field
const handleinput2=(e)=>{
    let prod={...Adata}
let getvaue=e.target.value;
let getname=e.target.name;
prod[getname]=getvaue;
setAdata(prod)
}

//add field
const handleSubmit2=async(e)=>{
  setspin(true)
e.preventDefault();
if(Adata.Cname==''||Adata.Product==''||Adata.Qty==''||Adata.TotalPrice==''||Adata.Deposit==''){
  alert('All fields are required to be filled')
}
else{
let response=await axios.post(`${Api}/auth/Send`,Adata)
if(response.data){
    alert('Stored Successfully')
}

setAdata({
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:''  
})
axios.post(`${Api}/auth/Show`,data).then((res)=>{setfact(res.data)}).then(()=>setspin(false))
}
}


//to update fields
const handlesubmit=async(e)=>{
  setspin2(true)
  e.preventDefault()
let response= await axios.put(`${Api}/auth/UpdateAmount/?id=${getid}`,Data)
alert(response.data)
setData({
    Cname:'',
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:'',
    date:''
})
setupdate(false)
axios.post(`${Api}/auth/Show`,data).then((res)=>{setfact(res.data)}).then(()=>setspin2(false));
setdata({
  Cname:'',
  Product:''
})
}

 const handleDelete=async(ids)=>{
 let confirmation= confirm('do you want to delete this data');
 if(confirmation){
let response=await axios.delete(`${Api}/auth/Delete/${ids}`)
alert(response.data)
  let responses=await axios.post(`${Api}/auth/Show`,data)
setfact(responses.data)
setactive(true)
setdata({
  Cname:'',
  Product:''
})
 }


  }

const handleAdd=(name)=>{
Adata.Cname=name;
setAdd(true);
}

//cancel add and update menu
const Cancel=()=>{
  setupdate(false)
  setAdd(false)
  setData({
    Cname:'',
    Product:'',
    Qty:'',
    TotalPrice:'',
    Deposit:'',
    date:''
})


}

const printPDF = () => {
  const doc = new jsPDF("landscape");

  doc.setFontSize(18);
  doc.text("Transaction Report", 14, 15);

  const tableColumn = [
    "Date",
    "Company Name",
    "Product Name",
    "Quantity",
    "Total Amount",
    "Deposit",
    "Credit",
  ];

  const tableRows = [];

  let total = 0;
  let deposit = 0;
  let credit = 0;

  fact.forEach((v) => {
    total += v.TotalPrice;
    deposit += v.Deposit;
    credit += v.Credit;

    tableRows.push([
      new Date(v.date).toLocaleDateString(),
      v.Cname,
      v.Product,
      v.Qty,
      v.TotalPrice,
      v.Deposit,
      v.Credit,
    ]);
  });

  // Add totals row
  tableRows.push([
    "",
    "",
    "Total",
    "",
    total,
    deposit,
    credit,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 25,
    theme: "grid",
    headStyles: {
      fillColor: [0, 128, 0],
      textColor: 255,
    },
    styles: {
      halign: "center",
      fontSize: 10,
    },
  });

  doc.save("Transaction_Report.pdf");
};


  return (
    <div className='flex flex-col gap-8 items-center max-xl:p-2'>
      <img src={logo} alt="" className='w-[300px] max-lg:w-[250px] max-sm:w-[200px]'/>
      <div className={`filter-property grid lg:grid-cols-4 md:grid-cols-2 p-3 gap-5 w-5/6`}>
<div className='flex flex-col gap-2'>
    <label className='text-gray-700 font-medium'>Company</label>
   <input className='border-3 border-slate-800 w-4/6 p-2 rounded-xl text-lg focus:bg-white  focus:outline-none focus:ring-0 focus:border-red-500' type="text" placeholder='Enter Company Name' name='Cname' value={data.Cname} onChange={handleinput}/>
</div>
<div className='flex flex-col gap-2'>
    <label className='text-gray-700 font-medium'>Product</label>
    <input className='border-3 border-slate-800 w-4/6  p-2  rounded-xl text-lg  focus:outline-none focus:ring-0 focus:border-green-500 ' type="text" placeholder='Enter Product Name' name='Product' value={data.Product} onChange={handleinput} />
</div>
<div className='flex flex-col gap-2'>
    <label className='text-gray-700 font-medium'>From Date</label>
    <input type="date" name='Fdate' value={data.Fdate} onChange={handleinput} className='p-3 rounded-xl text-gray-400 font-medium border-3 border-slate-800 focus:border-blue-700 focus:outline-none'/>
</div>
<div className='flex flex-col gap-2'>
    <label className='text-gray-700 font-medium'>To Date</label>
    <input type="date" name='Todate' value={data.Todate} onChange={handleinput} className='p-3 rounded-xl text-gray-400 font-medium border-3 border-slate-700 focus:border-blue-800 focus:outline-none '/>
</div>
</div>
      <div className="showdata w-5/6 max-xl:w-full max-lg:hidden">
      {(active&&fact.length!=0?
         <table className='border w-full'>
            <thead>
<tr>
                <th className='border'>Date</th>
                <th className='border'>Company Name</th>
                <th className='border'>Product Name</th>
                <th className='border'>Quantity</th>
                <th className='border'>Total Amount</th>
                <th className='border'>Deposit</th>
                <th className='border'>Credit</th>
            </tr>
            </thead>
            <tbody className='border'>
                {fact.map((v,i)=>{
                 let date=new Date(v.date).toLocaleDateString();
                Total=Total+v.TotalPrice;
                Deposit=Deposit+v.Deposit;
                Credit=Credit+v.Credit;
return(
<tr key={i}>
                    <td className='border text-center'>{date}</td>
                    <td className='border text-center'>{v.Cname}</td>
                    <td className='border text-center'>{v.Product}</td>
                    <td className='border text-center'>{v.Qty}</td>
                    <td className='border text-center'>{v.TotalPrice}</td>
                    <td className='border text-center'>{v.Deposit}</td>
                    <td className='border text-center'>{v.Credit}</td>
                    <td className='border border-black text-center bg-red-400 text-white font-medium cursor-pointer' onClick={()=>handleDelete(v._id)} >Delete</td>
                    <td className='border  border-black text-center bg-green-400 text-white font-medium cursor-pointer' onClick={()=>handleUpdate(v._id)}>Update</td>
                    
                </tr>
)
                })}
                 <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='border text-center bg-green-500'>Amount Sum:{Total}</td>
                  <td className='border text-center bg-yellow-500'>Deposit Sum:{Deposit}</td>
                  <td className='border text-center bg-red-500'>Credit Sum:{Credit}</td>
                </tr>
            </tbody>
            
             
            
        </table>:<p className={`text-center ${fact.length==0&&(data.Cname!=''||data.Product!='')?'':'hidden'}`}>No Data</p>
      
      )}
       
      </div>

<div className={`w-2/6 flex justify-around mb-5 ${active&&fact.length!=0?'':'hidden'}`}>
  <button className={`font-medium px-2 py-1 bg-red-500 text-white rounded-xl cursor-pointer ${(data.Cname!=''?'':'hidden')}`} onClick={()=>handleAdd(fact[0]?.Cname)} >Add more to {fact[0]?.Cname}</button>
  <button className='font-medium px-4 py-1 bg-green-500 text-white rounded-xl cursor-pointer' onClick={printPDF}>Print</button>
</div>

{Update?
<div className='w-full flex items-center justify-center fixed top-0 bottom-0 backdrop-blur-sm '>
<div className='w-2/6 flex flex-col bg-gradient-to-r from-slate-300 to-slate-500 rounded-2xl p-4 '>

<form className='flex flex-col items-center gap-3 w-full' onSubmit={handlesubmit}>
  <div className='w-full'>
     <label>Company Name:</label>
        <input className='border-none bg-white focus:outline-none focus:ring-0 focus:border-transparent" w-full p-1 rounded-xl text-lg' type="text" name='Cname' value={Data.Cname} placeholder='Company Name' onChange={handleInput}/>
  </div>
 <div className='w-full' >
  <label>Product Name:</label>
   <input className='bg-white w-full focus:outline-none focus:ring-0 focus:border-transparent p-1 rounded-xl text-lg' type="text" placeholder='Product Name' name='Product' value={Data.Product} onChange={handleInput}/>
 </div>
   <div className='w-full'>
    <label>Quantity:</label>
  <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-1 rounded-xl text-lg' type="number" placeholder='Enter Quantity In Kg' name='Qty' value={Data.Qty} onChange={handleInput}/>
    </div>    
      <div className='w-full'>
        <label>Total Price:</label>
 <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-1 rounded-xl text-lg' type="number" placeholder='Total Amount'name='TotalPrice' value={Data.TotalPrice} onChange={handleInput}/>
      </div>
       <div className='w-full'>
        <label>Deposit:</label>
         <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-1 rounded-xl text-lg' type="number" placeholder='Deposit Amount' name='Deposit' value={Data.Deposit} onChange={handleInput}/>
       </div>
       <div className='w-full'>
        <label>Date:</label>
         <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-1 rounded-xl text-lg' type='date' placeholder='Date' name='date' value={Data.date} onChange={handleInput}/>
       </div>
        <button className={`bg-green-500  w-2/6 p-1  ${spin2?'hidden':''} rounded-xl text-lg  cursor-pointer text-white`}>Update</button>
        <div role="status" class={`flex flex-col items-center mt-6 ${spin2?'':'hidden'}`}>
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
      <br />
      <button className='bg-red-500 self-center w-2/6 p-1 rounded-xl text-lg cursor-pointer text-white' onClick={Cancel}>Cancel</button>
</div>
</div>
:<></>
}

{Add?
<div className='w-full flex items-center justify-center fixed top-0 bottom-0 backdrop-blur-sm'>
    <div className='w-2/6 flex flex-col bg-gradient-to-r from-slate-300 to-slate-500 rounded-2xl p-4 '>
      <form className='flex flex-col items-center gap-3 w-full' onSubmit={handleSubmit2}>
        <input className='border-none bg-white focus:outline-none focus:ring-0 focus:border-transparent" w-full p-2 max-sm:py-1  rounded-xl text-xl max-sm:text-lg' type="text" name='Cname' value={Adata.Cname} placeholder='Company Name' onChange={handleinput2}/>
        <input className='bg-white w-full focus:outline-none focus:ring-0 focus:border-transparent p-2 rounded-xl text-xl max-sm:py-1 max-sm:text-lg' type="text" placeholder='Product Name' name='Product' value={Adata.Product} onChange={handleinput2}/>
        <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-2 rounded-xl text-xl max-sm:py-1 max-sm:text-lg' type="number" placeholder='Enter Quantity In Kg' name='Qty' value={Adata.Qty} onChange={handleinput2}/>
        <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-2 rounded-xl text-xl max-sm:text-lg max-sm:py-1' type="number" placeholder='Total Amount'name='TotalPrice' value={Adata.TotalPrice} onChange={handleinput2}/>
        <input className='bg-white focus:outline-none focus:ring-0 focus:border-transparent w-full p-2 rounded-xl text-xl max-sm:text-lg max-sm:py-1' type="number" placeholder='Deposit Amount' name='Deposit' value={Adata.Deposit} onChange={handleinput2}/>
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
      <br />
      <button className='bg-red-500 self-center w-2/6 p-1 rounded-xl text-lg cursor-pointer text-white' onClick={Cancel}>Cancel</button>
    </div>
      
    </div>  :<></>
}
  
    
    </div>
  )
}
