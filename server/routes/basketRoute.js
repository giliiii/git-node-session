const express=require("express")
const router=express.Router()
const basketController=require("../controllers/basketController")
const verifyJWT = require("../midlleware/verifyJWT")

router.get("/",basketController.getAllBasket)

router.get("/my",verifyJWT,basketController.getBasketForUser)//הסל של המשתמש הנוכחי

router.post("/create",verifyJWT,basketController.addProductForUser)//להוסיף מוצר למשתמש הנוכחי

router.delete("/delete",verifyJWT,basketController.deleteProductForUser)//להוריד ב-1מוצר מסוים

router.post("/add",verifyJWT,basketController.addExistProductForUser)//להוריד ב-1מוצר מסוים


router.delete("/delproduct",verifyJWT,basketController.deleteAllThisProductForUser)//למחוק לגמרי מוצר מסוים של המתמש הנוכחי

module.exports=router