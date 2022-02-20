const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const userRoute=require('./routes/userRouter')
const authJwt=require('./auth/authjwt')


//route
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set('view engine','ejs')
//app.use(authJwt);
app.use('/',userRoute)


//Database Connection
mongoose.connect(process.env.Database_URL).then(()=>{
    console.log("Database Connected Success")
}).catch((err)=>{
    console.log(err)
})
app.listen(process.env.PORT,()=>{
    console.log(`server running at ${process.env.port}`)
})
