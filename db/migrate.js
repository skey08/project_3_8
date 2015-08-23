var db_connection = require("./connection");

db_connection.do.sync({force: true}).then(function(){
  process.exit();
});
