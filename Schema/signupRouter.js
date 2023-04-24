const mongoose=require('mongoose');

const SignupSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    token:String
},{timestamps:true});

module.exports=SignupSchema;