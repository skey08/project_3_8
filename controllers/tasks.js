var express = require("express");
var app = express();
var DB = require("../db/connection");
var Task = DB.models.Task;
var List = DB.models.List;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

function tasksWithListNames(tasks, lists){
  var s, a;
  for(s in tasks){
    for(a in lists){
      if(lists[a].id == tasks[s].listId){
        tasks[s].listName = lists[a].name;
        break;
      }
    }
  }
  return tasks;
}

app.get("/tasks", function(req, res){
  var tasks;
  Task.findAll()
  .then(function(s){
    tasks = s;
    return List.findAll()
  })
  .then(function(lists){
    res.render("tasks/index", {tasks: tasksWithListNames(tasks, lists)});
  });
});

app.get("/tasks/new", function(req, res){
  res.render("tasks/new");
})

app.post("/tasks", function(req, res){
  if(!req.body.listId) return error(res, "List not found");
  Task.create(req.body).then(function(task){
    res.redirect("/tasks/" + task.id)
  });
});

app.get("/tasks/:id", function(req, res){
  var task;
  Task.findById(req.params.id)
  .then(function(s){
    if(!s) return error(res, "not found");
    task = s;
    return task.getList();
  })
  .then(function(list){
    task.listName = list.name;
    res.render("tasks/show", {task: task});
  });
});

app.get("/tasks/:id/edit", function(req, res){
  Task.findById(req.params.id).then(function(task){
    if(!task) return error(res, "not found");
    res.render("tasks/edit", {task: task});
  });
});

app.put("/tasks/:id", function(req, res){
  var task;
  if(!req.body.listId) return error(res, "List not found");
  Task.findById(req.params.id)
  .then(function(s){
    if(!s) return error(res, "not found");
    task = s;
    return task.updateAttributes(req.body);
  })
  .then(function(updatedTask){
    res.redirect("/tasks/" + updatedTask.id);
  });
});

app.delete("/tasks/:id", function(req, res){
  Task.findById(req.params.id)
  .then(function(task){
    if(!task) return error(res, "not found");
    return task.destroy();
  })
  .then(function(){
    res.redirect("/tasks");
  });
});

module.exports = app;
