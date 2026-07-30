let mongoose=require('mongoose');
let DataModel=mongoose.Schema({
   date:{
type:Date,
required:true
   },
    Cname:{
        type:String,
        required:true
    },
    Product:{
        type:String,
        required:true 
    },
    Qty:{
        type:Number,
        required:true,
        min:0,
    },
     TotalPrice:{
        type:Number,
        required:true,
    },
    Deposit:{
        type:Number,
        required:true
    },
    Credit:{
       type:Number,
        required:true  
    }
})
let Data=mongoose.model('DataT',DataModel);
module.exports={Data}