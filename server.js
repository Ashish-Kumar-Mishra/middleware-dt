const express=require('express');
const path = require('path');
const fs=require('fs')

const app=express();

const port=process.env.PORT ||3000;


app.use(function(req,res,next){
    console.log("Request Date:" +new Date());
    // res.send('Welcome to middliware app')
    // res.sendFile('./static/cool.txt')
    next();
})

app.use(function(req,res,next){
    var filepath=path.join(__dirname,"static",req.url)
    fs.stat(filepath,function(err,fileinfo){
        if(err){
            next();
            return 
        }
        if(fileinfo.isFile()){
            res.sendFile(filepath)
        }else{
            next();
        }
    })
})
app.use(function(req,res){
    res.status(404);
    res.send('File is not found')
})

app.listen(port,()=>{
    console.log(`listening on the http://localhost:${port}`);
})
