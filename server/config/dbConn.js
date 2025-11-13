const mongoose=require('mongoose')
const express=require("express")


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
        console.error("Error!!!",err)
    }
}


module.exports = connectDB