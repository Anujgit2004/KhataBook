let express=require('express');
const { Signup, login, sendData,UpdateAmount,ShowData,DeleteData, middleware, ShowAllData } = require('./api');
let route=express.Router()
route.post('/Signup',Signup)
route.post('/Login',login)
route.post('/Send',sendData)
route.get('/Data',ShowAllData)
route.put('/UpdateAmount',middleware,UpdateAmount)
route.delete('/Delete/:id',middleware,DeleteData)
route.post('/Show',ShowData)
module.exports=route