const express=require('express')
const bcrypt=require('bcryptjs')
const router=express.Router()
const userModel=require('../models/userSchems')


router.get('/alluser',async (req,res)=>{
  const alluser=await userModel.find()
  if(!alluser){
      res.status(500).send("no user")
  }
  else{
      res.send(alluser)
  }
})

router.post('/', async(req,res)=>{
   const newUser= new userModel({
       name:req.body.name,
       email:req.body.email,
       password:bcrypt.hashSync(req.body.password)

        })
    await newUser.save((err)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            res.status(200).send({message:'new user created'})
        }
    })    
    
})

module.exports=router
