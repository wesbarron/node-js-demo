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
            complete = [];
            for(i=0; i<todo.length; i++){
                if(todo[i].done){
                    complete.push(todo[i].item);
                }else{
                    task.push(todo[i].item);
                }
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

    /*
    let removeTodo = new Todo({
        item: req.body.check,
        done: false
    });
    removeTodo.delete(function(err){
        if (err){
            console.log(err);
        }
        res.redirect('/'); */

    if (typeof removeTodo === "string"){
        Todo.update({item: removedTask}, {done: true}, function(err){
            console.log(err);
        });
      //  removeTodo.remove(item);
        //task.splice(task.indexOf(removedTask), 1);
    }
    else if (typeof removeTodo === "object"){
        for (var i = 0; i < todo.length; i++){
            Todo.update({item: removedTask[i]}, {done: true}, function(err){
            console.log(err);
        });
           // removeTodo.save(removedTask[i]);
            //task.splice(task.indexOf(removedTask[i]), 1);
        }
    }
    res.redirect('/');
});



http.createServer(app).listen(port, function(){

});
