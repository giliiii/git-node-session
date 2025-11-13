const mongoose=require("mongoose")
const basketSchema = require("./Basket")

const userSchema=new mongoose.Schema({
    username:{//id
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        // includ:"@"//g
        // required:true,
    },
    phone:{
        type:String,
  
    },
    roles:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    active:{
        type:Boolean,
        default:true,
    },
    // basket:basketSchema//g
},
{
    timestamps:true
})
module.exports=mongoose.model('User',userSchema)