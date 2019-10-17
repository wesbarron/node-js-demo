var http = require('http');
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ encoded: true}));

var task = ["excercise", "eat"];
var removedTask = [];

app.get('/', function(req, res){
    res.render("index", {task:task});
    res.render("index", {removedTask:removedTask});
});

app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
});

app.post('/removetask', function(req, res){
   var deleteTask = req.params.id;
   if (deleteTask == task.checked){
       task.slice(deleteTask,1);
   }

    res.redirect('/');
});

http.createServer(app).listen(port, function(){

});
