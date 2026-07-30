const { Data } = require("./DataSchema");
const { generatetoken } = require("./Jwt");
require('dotenv').config();
const { User } = require("./UserSchema");
const bcrypt=require('bcrypt')
let Uemail=null;

const middleware=(req,res,next)=>{
    let mail=process.env.ADMIN_EMAIL
if(Uemail!=mail){
    return res.send('Only admin can update or delete')
}
next()
}

const Admin=async(req,res)=>{
    try{
 let name='Admin Panel'
 let email=process.env.ADMIN_EMAIL
 let Pass=process.env.ADMIN_PASS
let findadmin=await User.findOne({email});
if(!findadmin){
  let hashpass=await bcrypt.hash(Pass,10)
let admindata=await User({
    name,
    email,
    password:hashpass
})
admindata.save().then(()=>console.log('Admin Registered Successfully'))
}
else{
    console.log("Admin exist")
}
    }
   catch(err){
    console.log(err)
   }
}

const Signup=async(req,res)=>{
    try{
let{name,email,password}=req.body;
let useremail=await User.findOne({email});
if(!useremail){
  let hashpass=await bcrypt.hash(password,10)
   let UserData= await User({
        name,
        email,
        password:hashpass
    })
UserData.save().then(()=>{
let token=generatetoken(UserData);
  res.json({data:token,user:UserData})
})}
else{
    res.json({message:'user already exist'})
}
    }
    catch(err){
        console.log(err)
    }

}

const login=async(req,res)=>{
    try{
 let{email,password}=req.body;
    let Udata=await User.findOne({email})
    if(!Udata){
    return res.json({message:'Email does not match'})
    }
   let Upassword=await bcrypt.compare(password,Udata.password);
   if(!Upassword){
    return res.json({message:'Password not matched'})
   }
   Uemail=Udata.email
  let token=generatetoken(Udata);
  res.json({data:token,user:Udata})
    }
    catch(err){
        console.log(err)
    }
   
}

const sendData=async(req,res)=>{
    try{
 let{Cname,Product,Qty,TotalPrice,Deposit}=req.body;
 let newcredit=TotalPrice-Deposit
   let DataFilled=await Data({
date:new Date(),
Cname,
Product,
Qty,
TotalPrice,
Deposit,
Credit:newcredit
    })
 DataFilled.save().then(()=>res.send(DataFilled))
    }
    catch(err){
        res.send(err)
    }
   
}
 
const UpdateAmount=async(req,res)=>{
    try{
const{Cname,Product,Qty,Deposit,TotalPrice,date}=req.body;
const id=req.query.id;
let updatedData=await Data.findOneAndUpdate({_id:id},{$set:{Deposit,TotalPrice,Cname,Product,Qty,date,Credit:TotalPrice-Deposit}})
updatedData.save().then(()=>res.send('Successfully Updated'))
}
catch(err){
    console.log(err)
}
}

const DeleteData=async(req,res)=>{
    try{
let id=req.params.id;
let response=await Data.findByIdAndDelete({_id:id});
res.send('Deleted Successfully')
    }
catch(err){
    res.send(err)
}
}

const ShowAllData=async(req,res)=>{
    try{
let users=await Data.find();
res.send(users).sort({date:-1})
    }
 catch(err){
    console.log(err)
 }
}

const ShowData=async(req,res)=>{
    try{
 let {Cname,Product,Fdate,Todate}=req.body;
 let obj={}
 if(Cname){
obj.Cname=Cname
obj.Cname={
   $regex: Cname, $options: 'i'  
}
 }
if(Product){
    obj.Product=Product
    obj.Product={
         $regex: Product, $options: 'i'
    }
}
let datefilter={}
  if (Fdate) {
            datefilter.$gte = new Date(Fdate); 
        }
if (Todate) {  
            const end = new Date(Todate);
            end.setHours(23, 59, 59, 999);
            datefilter.$lte = end;
        }

        if (Fdate||Todate) {
            obj.date =datefilter; // 'createdAt' is your DB date field
        }


        let users=await Data.find(obj).sort({date:-1})
        res.send(users);




    }
  catch(err){
    console.log(err)
  }
}
module.exports={Signup,login,sendData,UpdateAmount,ShowData,ShowAllData,DeleteData,Admin,middleware}