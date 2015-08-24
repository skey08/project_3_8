var express = require("express");
var app = express();
var DB = require("../db/connection");
var List = DB.models.List;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

app.get("/lists", function(req, res){
  List.findAll().then(function(lists){
    res.render("Lists/index", {lists: lists});
  });
});

app.get("/lists/new", function(req, res){
  res.render("lists/new");
});

app.post("/lists", function(req, res){
  List.create(req.body).then(function(list){
    res.redirect("/lists/" + list.id)
  });
});

app.get("/lists/:id", function(req, res){
  var list;
  List.findById(req.params.id)
  .then(function(a){
    if(!a) return error(res, "not found");
    list = a;
    return list.getTasks()
  })
  .then(function(tasks){
    res.render("lists/show", {list: list, tasks: tasks});
  });
});

app.get("/lists/:id/edit", function(req, res){
  List.findById(req.params.id).then(function(list){
    if(!list) return error(res, "not found");
    res.render("lists/edit", {list: list});
  });
});

app.put("/lists/:id", function(req, res){
  var updatedList, tasks;
  List.findById(req.params.id)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.updateAttributes(req.body)
  })
  .then(function(list){
    updatedList = list;
    return updatedList.getTasks()
  })
  .then(function(tasks){
    res.render("lists/show", {list: updatedList, tasks: tasks});
  });
});

app.delete("/lists/:id", function(req, res){
  List.findById(req.params.id)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.destroy()
  })
  .then(function(){
    res.redirect("/lists")
  });
});

module.exports = app;
