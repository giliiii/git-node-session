const Basket=require("../models/Basket")
console.log("Basket is:", Basket);

const Product = require("../models//Product")
const User = require("../models/User")

console.log("Basket is:", Basket)
console.log("Basket.find is:", Basket.find)


//1-getAllBasket
const getAllBasket = async (req, res) => {
    const basket = await Basket.find()
    if (!basket?.length) {
        return res.status(400).send("The basket is empty")
    }
    res.json(basket)
}

//
const getBasketForUser=async(req,res)=>{
    const basket=await Basket.find({user: req.user._id})
    console.log(req.user._id)
    if(!basket){
        res.status(400).send("User dont exist")
    }
    const products=basket.map(p=>({
        name:p.name,
        product:p.product,
        quantity: p.quantitybasket,
        price:p.price,
        description:p.description
    }))
    res.json(products)
}

//2-addProductForUser
const addProductForUser = async (req, res) => {
    console.log(req.user)
    // const {id}=req.user._id
    const { _id } = req.body
    console.log("122222222222222")
    if (!_id) {
        return res.status(404).send("Id is required")
    }
    const product = await Product.findById(_id)
    console.log("122222222222222")
    if (!product) {
        return res.status(408).send("No Product")
    }
    //  check=new Basket();
    const check = await Basket.findOne({ user: req.user._id, product: _id })
    console.log(check);
    if (check) {
        console.log(check.quantitybasket);
        check.quantitybasket++
        await check.save()
        res.send(check)
        console.log(check.quantitybasket);
        console.log("aa");
    }
    else {
        const basket = await Basket.create({ user: req.user._id, product: product.id , name: product.name, price:product.price})
        await basket.save()
        console.log(basket);
        console.log("bb");
          return res.send(basket);
    }
    // res.send(`Product for'${product.name}' add successfully`)//??
}

//3
const deleteProductForUser = async (req, res) => {
    console.log(req.user)
    const { _id } = req.body//המשתמש מכניס את הidשל המוצר שהוא רוצה להכניס לסל של עצמו
    console.log("122222222222222"+_id)
    if (!_id) {
        return res.status(404).send("Id is required")
    }
    const product = await Product.findById(_id)
    if (!product) {
        return res.status(408).send("No Product")
    }
    const check = await Basket.findOne({ user: req.user._id, product: _id })
    console.log(check);
    if (check) {

        console.log(check.quantitybasket)
        if(check.quantitybasket<=1){
            return res.status(400).send("The")
        }
        check.quantitybasket--
        await check.save()

        res.send(check)
        console.log(check.quantitybasket);
        console.log("aa");
    }
}

const addExistProductForUser = async (req, res) => {
    console.log(req.user)
    const { _id } = req.body//המשתמש מכניס את הidשל המוצר שהוא רוצה להכניס לסל של עצמו
    console.log("122222222222222"+_id)
    if (!_id) {
        return res.status(404).send("Id is required")
    }
    const product = await Product.findById(_id)
    if (!product) {
        return res.status(408).send("No Product")
    }
    const check = await Basket.findOne({ user: req.user._id, product: _id })
    console.log(check);
    if (check) {

        console.log(check.quantitybasket)
        check.quantitybasket++
        await check.save()
        res.send(check)
        console.log(check.quantitybasket);
        console.log("aa");
    }
}



//4-deleteAllThisProductForUser
const deleteAllThisProductForUser = async (req, res) => {
    console.log(req.user)
    const { _id } = req.body
    console.log("122222222222222")
    if (!_id) {
        return res.status(404).send("Id is required")
    }
   const basket=await Basket.find({user: req.user._id,product: _id}).exec()
   if(!basket){
    return res.status(400).send("You don't have this product")
   }
   const result = await Basket.deleteOne()
   res.json({message: 'Deleted'})
}

module.exports = {
    getAllBasket,
    getBasketForUser,
    addProductForUser,
    deleteProductForUser,
    addExistProductForUser,
    deleteAllThisProductForUser
}