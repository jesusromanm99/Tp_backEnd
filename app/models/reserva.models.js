
module.exports = (sequelize, Sequelize) => {
    const db = require("../models");
    const Reserva = sequelize.define("reserva", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATE
        },
        hora:{
            type:Sequelize.STRING
        },
    });
    return Reserva;
};