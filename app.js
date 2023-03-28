const express=require('express')
const app=express();
const connectDB=require('./db/connect')
const homeProducts=require("./routes/homepage")
const adminPanel=require("./routes/admin");
const products=require("./routes/product")
const productReview=require("./routes/productReview")
const oneProductShop=require("./routes/user_productDetails")
const session=require('cookie-session')
const userLogin=require("./routes/userLogin")
const checkout=require("./routes/checkout")
const orderInfo=require("./routes/orderInfo")
const getSortedProducts=require("./routes/shop")
require('dotenv').config()
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
}))

app.use(express.json())
app.use("/api/v1",homeProducts,oneProductShop,userLogin,productReview,checkout,orderInfo,getSortedProducts)
app.use("/adminPanel/api/v1",products)

app.use(express.static('./public'))
app.use(express.static("./public/adminPanel"))
const port=process.env.PORT||3000


const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server is listening port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
