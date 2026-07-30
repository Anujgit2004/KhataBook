let jwt=require('jsonwebtoken');
require('dotenv').config();

let generatetoken=(Userdata)=>{
   let key=process.env.SECRETKEY;
let payload={
    id:Userdata._id,
    email:Userdata.email,
}
return jwt.sign(payload,key,{expiresIn:'2hr'})
}
module.exports={generatetoken}