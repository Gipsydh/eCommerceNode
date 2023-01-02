const express=require('express')
const app=express()
const connectDB=require("./db/connect")
const jsonProduct=require("./products.json")
const Products=require("./models/products")
require('dotenv').config();

const start=async()=>{
    try {
        console.log("success")        
        await connectDB(process.env.MONGO_URI)
        await Products.deleteMany();
        await Products.create(jsonProduct)
    } catch (error) {
        console.log(error);
    }
}

start()