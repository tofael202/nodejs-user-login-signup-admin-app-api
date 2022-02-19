const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const userRoute=require('./routes/userRouter')


//route
app.use(express.json())
app.use('/',userRoute)


//Database Connection
mongoose.connect(process.env.Database_URL).then(()=>{
    console.log("Database Connected Success")
}).catch((err)=>{
    console.log(err)
})
app.listen(process.env.port,()=>{
    console.log(`server running at ${process.env.port}`)
})
