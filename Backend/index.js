let express=require('express');
let cors=require('cors');
let mongoose=require('mongoose');
const { Signup, Admin } = require('./api');

const route = require('./Route');
require('dotenv').config();
let app=express();

app.use(cors({
  origin:'https://khatabook-ui.onrender.com',
  methods:['POST','GET','PUT','DELETE']
}));
app.use(express.json());





async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.URI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 

catch(err){
console.log(err)
}
}
run()
Admin();
app.get('/',(req,res)=>res.send('backend is running'))
app.use('/auth',route)
app.use('/user',route)
app.listen(7000);