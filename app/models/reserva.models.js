
module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("reserva", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATE
        },
        hora_inicial:{
            type:Sequelize.INTEGER
        },
        hora_final:{
            type:Sequelize.INTEGER
        },
        cantidad_solicitada:{
            type:Sequelize.INTEGER
        }
    });
    return Reserva;
};