const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send("Hello World");
});

app.get('/about', function(req, res){
    res.send("<h1>about page</h1>");
});

app.listen(port, function(){

});