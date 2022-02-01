require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose')
const cors=require('cors')
const jwt=require('jsonwebtoken')
app.use(express.json())
app.use(cors());

const UserModel=require('./database/User');
const { response } = require('express');

//MongoDB Connection
var mongodb=process.env.MONGO_URI;
mongoose.connect (mongodb,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("CONNECTION ESTABLISHED"));

app.post("/getJwtToken",async(req,res)=>{
    const {email}=req.body.email
    const token =jwt.sign(
        {email:email},
        "1234567",
        {
            expiresIn:"5m"
        }
    )
    return res.json({
        token:token
    })
})

//Default Get APi
app.get("/",(req,res)=>{
    return res.json({
        "Welcome":"This API is working"
    })
})

//Get All Users
app.get("/getUsers",async(req,res)=>{
    const users=await UserModel.find()
    res.json({
        users:users
    })
})

//Delete User
app.post("/deleteUser",async(req,res)=>{
    const {id}=req.body
    const users=await UserModel.findByIdAndDelete(id)
    if(users){
        res.json({
            delete:true
        })
    }
})

//Add USER API
app.post("/addUser",async(req,res)=>{
    const newUser=await UserModel.create(req.body)
    return res.json({
        message:"User Added Successfully",
        icon:"success"
    })
})

app.listen(process.env.PORT || 4000,()=>{
    console.log("Express App is Running")
})