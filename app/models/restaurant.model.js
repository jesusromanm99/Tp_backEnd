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
    return Restaurant;
};

