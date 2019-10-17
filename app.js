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
});

app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
});

app.post('/removetask', function(req, res){
<<<<<<< HEAD
    var deleteTask = req.param.id.checked;

    if(deleteTask){
    task.splice(req.params.id);
    }
    else{
        res.send("no deletion of " + req.params.id);
    }

=======
   var deleteTask = req.param.id.checked;

    if(deleteTask){
    task.splice(req.params.id);
    removedTask.push(deleteTask);
    }
    else{
        req.send("no deletion of " + req.params.id);
    }
>>>>>>> c9fc50fad4f9c669eff031294353297e9a8c3914
    res.redirect('/');
})

http.createServer(app).listen(port, function(){

});
