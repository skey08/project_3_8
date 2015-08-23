var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///project_3_8_db");
var List = sequelize.import("../models/list");
var Task = sequelize.import("../models/task");

Task.belongsTo(List);
List.hasMany(Task);

module.exports = {
  sql: Sequelize,
  do: sequelize,
  models: {
    List: List,
    Task: Task
  }
}
