require("dotenv").config()
const express=require("express")
const app=express()
const cors=require('cors')
const mongoose=require("mongoose")

const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const PORT=process.env.PORT || 5555

connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/user",require("./routes/userRoute"))
app.use("/api/product",require("./routes/productRoute"))
app.use("/api/basket",require("./routes/basketRoute"))

console.log(mongoose.models);



mongoose.connection.once('open',()=>{
    console.log('connect to mongoDB')
    app.listen(PORT, () => console.log(`server running on ${PORT}`))
})
mongoose.connection.on('error',err=>{
    console.log(err)
})