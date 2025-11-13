const Product=require("../models/Product")

//1-getAllProducts
const getAllProducts=async (req,res)=>{
    const product=await Product.find()
    if(!product?.length){
        return res.status(400).send("Not found")
    }
    res.json(product)
}

//2-getProductByType-להציג את כל המוצרים שהמשתמש הכניס לפי קטגוריה
const getProductByCategory=async (req,res)=>{
    const {category}=req.query
    const product=await Product.find({category})
    if(!product){
        return res.status(400).send("Not found")
    }
    res.json(product)
}

//
const getProductByName=async (req,res)=>{
    const {name}=req.body
    const product= await Product.find({name})
    if(!product){
        return res.status(402).send("Not found")
    }
    res.json(product)
}

//3-createNewProduct
const createNewProduct = async (req,res)=>{
    const {name,price,category,quantity,describe}=req.body
    if(!name || !price || !quantity ){//picture
       return  res.status(401).send("Name, price ,picture and quantity are required")
    }
    const duplicate=await Product.findOne({name})
    if(duplicate){
        return res.status(406).send("Duplicate name")
    }
    if(price<10 || price>500){
        return res.status(402).send("המחיר צריך להיות בין 10שח ל500 שח")
    }
    const product=await Product.create({name,price,category,quantity,describe})
    
    if(product){
      return  res.status(200).send("New product created")
    }
    else{
       return res.status(401).send("Invalid product")
    }
}

//4-getProductById
const getProductById=async (req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id)
    if(!product){
        return res.status(402).send("Not Found product")
    }
    res.json(product)
}


//4-updateProduct
const updateProduct=async (req,res)=>{
    const {_id,name,price,category,quantity,picture,describe}=req.body
    if(!_id || !name || !price || !quantity ){
        return res.status(404).send("Name, price,id and quantity are required")
    }
    const product=await Product.findById(_id).exec()
    if(!product){
        return res.status(404).send("No found")
    }
    product.name=name
    product.price=price
    product.category=category
    product.quantity=quantity
    product.describe=describe
    product.picture=picture
    
    const updateProduct=await product.save()
    res.json(`'${updateProduct}' update`)
}

//6-deleteProduct
const deleteProduct=async (req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id).exec()
    if(!product){
        return res.status(406).send("Not found")
    }
    const result=await product.deleteOne()
    const reply=`Product '${product.name}' deleted`//g
    res.json(reply)
}

module.exports={
    getAllProducts,
    createNewProduct,
    getProductByCategory,
    getProductByName,
    getProductById,
    updateProduct,
    deleteProduct
}