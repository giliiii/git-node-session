const jwt=require('jsonwebtoken')
const User=require("../models/User")
const bcrypt=require('bcrypt')

//1-all
const getAllUser=async (req,res)=>{
    const user=await User.find()
    if(!user?.length){
        return res.status(400).send("No user")
    }
    res.json(user)
}

//2-createNewUser
const registerUser=async (req,res)=>{
    const {username,password,name,email,phone,roles}=req.body
    if(!username || !password || !name ){
        return res.status(401).send("Username,password and name are required!")
    }
    const duplicate = await User.findOne({username}).lean()
    if(duplicate){
        return res.status(404).send("Duplicate username")
    }
    const hashedPwd = await bcrypt.hash(password,10)
    const userObject = {username,password:hashedPwd,name,email,phone,roles}
    const user = await User.create(userObject)
    console.log(user.roles)
    if(user){
        return res.status(202).json({message:`New user ${user.name} created`})
    }
    else{
        return res.status(408).send("Invalid user received")
    }
}

//3-getById-already exist
const loginUser=async (req,res)=>{
    const {username,password,name}=req.body
    if(!username || !password || !name){
        return res.status(405).send("All fields are required")
    }
    const foundUser=await User.findOne({username}).lean()
    if(!foundUser || !foundUser.active){
        return res.status(406).send("Unauthorized")
    }
    const match = await bcrypt.compare(password,foundUser.password)
    if(!match){
        return res.status(476).send("Unauthorized")
    }
    const userInfo={_id:foundUser._id,username:foundUser.username,name:foundUser.name,email:foundUser.email,phone:foundUser.phone,roles:foundUser.roles}
    const accessToken= jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})
}

module.exports={getAllUser,registerUser,loginUser}