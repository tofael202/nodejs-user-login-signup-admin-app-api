const jwt = require("express-jwt");

const secret='secret'

const authJwt=jwt({
   secret,
   algorithms:['HS256'] 
}).unless({
    path:[
        {url:'/',methods:['post','OPTIONS']},
        '/login',
        '/signup',
        '/create'
    ]
})

module.exports=authJwt