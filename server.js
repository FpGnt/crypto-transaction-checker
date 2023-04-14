var express = require("express");
require('dotenv').config()
var os = require("os");
var cp = require('child_process');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (request, response){
    response.sendFile(__dirname+"/index.html");
});


app.post('/fucktard', function (request, response) {
    var opts = Object.create(process.env);
    opts.execArgv = [request.body.address,request.body.amount];
    const child = cp.fork('./scripts/transaction.js'); // no need for 'new'

    retard={['address']:request.body.address, ['amount']:request.body.amount, ['chain']:request.body.chain}

    child.send(retard);

    child.on('message', function(msg) {
        response.send(msg);
    });


});


//start the server
app.listen(8080);

console.log("http://localhost:8080");