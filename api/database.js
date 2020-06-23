const mongoose = require("mongoose");

const DB_CONNECTION = 'mongodb://mongo/test';

var signupSchema = mongoose.Schema({
    name:String,
});

var user = exports.signupSchema =mongoose.model('user', signupSchema );

exports.initializeMongo = function() {
    mongoose.connect(DB_CONNECTION);

    console.log("Trying to connect db.....", DB_CONNECTION);

    var db = mongoose.connection;
    db.on('error', function(){
        console.log("Connection error: Please check the connection and DB is up and running..!");
    })
    db.once('open', function(){
        console.log("DB successful");
    })
}