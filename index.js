const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "opium123";

const app = express();
app.use(express.json());
const users=[];

function auth (req,res,next){

    const token = req.headers.token;

    const datadecode = jwt.verify(token,JWT_SECRET);

    if(datadecode.username){
        next();
    }
    else{
        res.json({
            message : "You are not logged in."
        })
    }
}

app.post("/signup",function(req,res){

    const username = req.body.username;
    const password = req.body.password;   

    users.push({
        username : username,
        password : password
    })

    res.json({
        message : "You are signed in"
    })

})
 
app.post("/sigin" ,function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    let founderUser=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username === username && users[i].password === password){
            founderUser =  users[i];
        }
    }

    if(!founderUser){
        res.json({
            message : "Account not found."
        })
    }
    else{
        const token = jwt.sign({
            username
        },JWT_SECRET );

        res.json({
            token : token
        })
    }
})

app.get("/me",auth,function(req,res){

    const token = req.headers.token; 

    const decodetoken = jwt.verify(token,JWT_SECRET);

    if(decodetoken.username){

         let founderUser=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username === decodetoken.username    ){
            founderUser =  users[i];
        }
    }

    res.json({
        username : founderUser.username,
        password : founderUser.password
    })
    }

})

app.listen(3000);

