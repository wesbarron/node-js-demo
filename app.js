var http = require('http');
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ encoded: true}));
app.use(express.static("public"));

var task = [];
var complete = [];
/*
app.get('/', function(req, res){
    res.render("index", {task:task, complete:complete});
});
*/
var newComic = "http://xkcd.com/614/info.0.json";

app.get('/', function(req, res){
    res.render("comic", {task:task, newComic:newComic});
});
/*
app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    if (newTask !== ""){
    task.push(newTask);
    }
    res.redirect('/');
});

app.post('/removetask', function(req, res){
    var removedTask = req.body.check;

    if (typeof removedTask === "string"){
        complete.push(removedTask);
        task.splice(task.indexOf(removedTask), 1);
    }
    else if (typeof removedTask === "object"){
        for (var i = 0; i < removedTask.length; i++){
            complete.push(removedTask[i]);
            task.splice(task.indexOf(removedTask[i]), 1);
        }
    }
    res.redirect('/');
});
*/

//random comic post
app.post('addComic', function(req, res){
    var data = JSON.parse(newComic);
    console.log(data.body);
    res.send(data);

   // res.redirect('/');
});

http.createServer(app).listen(port, function(){

});
