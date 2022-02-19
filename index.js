const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()


//server running

app.listen(process.env.port,()=>{
    console.log(`server running at ${process.env.port}`)
})
