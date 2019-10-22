var http = require('http');
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false}));
app.use(express.static("public"));
const Todo = require('./model/todo.model');
const mongoDB = 'mongodb+srv://mongoTest:1234@cluster0-5iztt.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"))

var task = [];
var complete = [];

app.get('/', function(req, res){
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }else{
            task = [];
            for(i=0; i<todo.length; i++){
                task.push(todo[i].item);
            }
        }
    });
    res.render("index", {task:task, complete:complete});
});


app.post('/addtask', function(req, res){
    let newTodo = new Todo({
        item: req.body.newtask,
        done: false
    })
    newTodo.save(function(err){
        if (err){
            console.log(err);
        }
        res.redirect('/');
    });
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


http.createServer(app).listen(port, function(){

});
