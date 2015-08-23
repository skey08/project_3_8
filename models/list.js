module.exports = function(db_connection, Sequelize){
  return db_connection.define("list", {
    title: Sequelize.STRING
  });
}
