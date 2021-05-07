const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port:dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Ventas = require("./venta.model.js")(sequelize, Sequelize);

db.Restaurant = require("./restaurant.model.js")(sequelize, Sequelize);
db.Mesa = require("./mesa.models.js")(sequelize, Sequelize);

db.Cliente = require("./cliente.models.js")(sequelize, Sequelize);
db.Reserva = require("./reserva.models.js")(sequelize, Sequelize);
module.exports = db;