const mongoose=require("mongoose")
const basket=require("./Basket")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    price:{
        type:Number,
        min:10,
        max:500,
        required:true
    },
    category:{
        type:String,
        enum:["טבלאות","מיוחדים","שוקולדים","מארזים","מקרונים"],
        default:"שוקולדים"
    },
    quantity:{
        type:Number,
        required:true,
        min:0
    },
    picture:{
        type:String,
        // required:true
    },
    describe:{
        type:String,
        maxLength:2000,
        trim:true
    }},{
        timestamps:true
})
module.exports=mongoose.model('Product',productSchema)