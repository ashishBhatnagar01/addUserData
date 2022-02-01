const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    contactNo:{
        type:Number
    },
    email:{
        type:String
    },
    address:{
        type:String,
        default:""
    }
})
const UserModel=mongoose.model("users",UserSchema)
module.exports=UserModel