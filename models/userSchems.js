const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:'false'
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const userModel=new mongoose.model('UserInfo',userSchema);

module.exports=userModel;