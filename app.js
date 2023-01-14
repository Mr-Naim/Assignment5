const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const rateLimit=require('express-rate-limit')
const helmet=require('helmet')
const mongoSanitize=require('express-mongo-sanitize')
const xss=require('xss-clean')
const cors=require('cors')
const hpp=require('hpp')
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);

//MongoDB Database Connection
let URI="mongodb+srv://abunaim:PiTCqFuXsda4eElM@cluster0.yjaukdf.mongodb.net/Todo";
let OPTION={user:'',pass:'',autoIndex:true};
mongoose.connect(URI,OPTION,(error)=>{
    console.log(error);
    console.log('Connection Success');

})


app.use("/api/v1",router);


//Undefined route
app.use("*",(req,res)=>{
    res.status(404).json({status:"Failed",data:"Not Found"});
})

module.exports = app;