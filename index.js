var express = require("express")
var app = express()

app.get("/", function(req, res){
  res.send("Hola Mundo")
})

app.listen(4000, function(){
  console.log("app listening on port 4000")
})
