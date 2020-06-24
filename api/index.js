console.log("app starting...!");
const express = require('express');
const database = require('./database');
const app = express();

database.initializeMongo();

app.get('/', function(req, res){
    res.send('Hello worlds');
})

app.listen(3000, function(){
    console.log('Signup app is listening to the port 3000');
})

app.get('/test', function(req,res){
    database.signupSchema.find(function(err, users){
        if(err)
        console.log(err);
        res.json(users);
    })
})