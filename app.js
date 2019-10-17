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
var complete = [];

app.get('/', function(req, res){
    res.render("index", {task:task, complete:complete});
});

app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
});

app.post('/removetask', function(req, res){
    var removedTask = req.body.check-1;

    /*if (typeof removedTask === "string"){
        complete.push(removedTask);
    }*/
    if (typeof removedTask === "object"){
        for (var i = 0; i < removedTask.length; i++){
            complete.push(removedTask[i]);
            task.splice(task.indexOf(removedTask[i]));
        }
    }
    res.redirect('/');
});

http.createServer(app).listen(port, function(){

});
