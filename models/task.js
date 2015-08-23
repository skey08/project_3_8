module.exports = function(db_connection, Sequelize){
  return db_connection.define("task", {
    content: Sequelize.STRING,
    listId: Sequelize.INTEGER
  });
}
