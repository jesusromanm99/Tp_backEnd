
module.exports = (sequelize, Sequelize) => {
    var Mesa = sequelize.define("mesa", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        posicion_x: {
            type: Sequelize.INTEGER
        },
        posicion_y: {
            type: Sequelize.INTEGER
        },
        planta:{
            type: Sequelize.INTEGER,
            defaultValue:1
        },
        capacidad: {
            type: Sequelize.INTEGER
        },
    });
    return Mesa
}