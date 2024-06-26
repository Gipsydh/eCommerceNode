const express=require('express')
const app=express();
const connectDB=require('./db/connect')
const homeProducts=require("./routes/homepage")
const adminPanel=require("./routes/admin");
const products=require("./routes/product")
require('dotenv').config()
app.use(express.json())
app.use("/api/v1",homeProducts)
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