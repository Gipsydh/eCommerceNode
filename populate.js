const express=require('express')
const app=express()
const connectDB=require("./db/connect")
const jsonProduct=require("./country_list.json")
const Products=require("./models/countryLists")
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