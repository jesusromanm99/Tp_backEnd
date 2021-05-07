module.exports = (sequelize, Sequelize) => {
    var Restaurant = sequelize.define("restaurant", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        }
    });
    //var db = require("../models");
    /*
    var db = require("./mesa.models")
    console.log(db.Mesa);
    Restaurant.hasMany(db.Mesa)
    */
    return Restaurant;



};

