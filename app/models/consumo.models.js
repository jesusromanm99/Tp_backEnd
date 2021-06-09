module.exports = (sequelize, Sequelize) => {
    const Consumo = sequelize.define("consumo", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue:"abierto"
        },
        total: {
            type: Sequelize.INTEGER,
            defaultValue:0
        },
        fechaCreacion:{
            type:Sequelize.DATE,
            defaultValue:Sequelize.DataTypes.NOW
        },
        fechaCierre:{
            type:Sequelize.DATE,
            allowNull:true
        }
    });
    return Consumo;
}