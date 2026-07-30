let mongoose=require('mongoose');
let UserModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
         type:String,
        required:true,
    }
})
let User=mongoose.model('UserT',UserModel);
module.exports={User}