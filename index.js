var express = require("express")
var app = express()

// var db_connection = require("./models");

//root
app.get("/", function(req, res){
  res.send("Hola Mundo check out /lists")
})

// Index
app.get("/lists", function(req, res){
  res.send("Hey, here are all the lists")
});

// Show
app.get("/lists/:id", function(req, res){
  res.send("Hey, here's list number " + req.params.id);
});

// Create
app.post("/lists", function(req, res){
  res.send("Added a new List")
});

// Update
app.put("/lists/:id", function(req, res){
  res.send("List, " + req.params.id + " has been updated")
});

// Delete
app.delete("/lists/:id", function(req, res){
  res.send("List, " + req.params.id + " has been deleted")
});


app.listen(4000, function(){
  console.log("app listening on port 4000")
})
