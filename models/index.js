const { Sequelize, Model, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// each module must be accessed by its specific controller
// db.account = require("./account.model.js")(sequelize);

module.exports = db;