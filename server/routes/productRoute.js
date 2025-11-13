const express=require("express")
const router=express.Router()
const product=require("../models/Product")
const productController=require("../controllers/productController")
const manager=require("../midlleware/manager")


router.get("/",productController.getAllProducts)

router.get("/category",productController.getProductByCategory)

router.get("/name",productController.getProductByName)

router.post("/create",manager,productController.createNewProduct)

router.get("/:id",productController.getProductById)

router.put("/update",manager,productController.updateProduct)

router.delete("/:id",manager,productController.deleteProduct)

module.exports=router