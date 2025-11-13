const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")

router.get("/all",userController.getAllUser)

router.post("/re",userController.registerUser)//register-new

router.post("/login",userController.loginUser)//login

module.exports=router