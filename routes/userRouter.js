const express=require('express')
const bcrypt=require('bcryptjs')
const router=express.Router()
const userModel=require('../models/userSchems')
const jwt=require('jsonwebtoken')

router.get('/',async (req,res)=>{
    res.render('index')
  })
router.get('/alluser',async (req,res)=>{
  const alluser=await userModel.find()
  if(!alluser){
      res.status(500).send("no user")
  }
  else{
      res.send(alluser)
  }
})
router.get('/signup',async(req,res)=>{
    res.render('signup')
})
router.get('/login',async(req,res)=>{
    res.render('login')
})
router.get('/:id/update',async(req,res)=>{
    const userinfo=await userModel.findById(req.params.id)
    res.render('update',{userinfo})
})

router.post('/create', async(req,res)=>{
   const newUser= new userModel({
       name:req.body.name,
       email:req.body.email,
       password:await bcrypt.hashSync(req.body.password)
       })
    await newUser.save((err)=>{
        if(err){
            //res.status(500).send({message:err})
            console.log(err)
            res.render('index')
        }
        else{
            //res.status(200).send({message:'new user created'})
            res.render('login')
        }
    })  
      
    
})

router.post('/myaccount', async(req,res)=>{
      const userinfo= await userModel.findOne({email:req.body.email})
      if(!userinfo){
          res.status(400).send("No user found")
      }
      else{
        if(userinfo && bcrypt.compareSync(req.body.password,userinfo.password)){
            const token=jwt.sign({userid:userinfo._id},'secret',{
                expiresIn:'1d'
            })
            res.render('dashboard',{userinfo})
        }
        else{
            res.render('login')
        }
      }
})

router.post('/:id/finalupdate',async(req,res)=>{
    const userinfo=await userModel.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        email:req.body.email
    },{new:true}) 
    if(!userinfo){
        
        res.render('update')
    }
    else{
        //console.log(req.body.name)
        res.render('dashboard',{userinfo})
    }

})
router.get('/:id/delete',async (req,res)=>{
   const user= await userModel.findByIdAndRemove(req.params.id,(err)=>{
     if(err){
         res.render('dashboard')
     }
     else{
         res.redirect('/')
     }
    }).clone()
})

module.exports=router
