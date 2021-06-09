module.exports = (sequelize, Sequelize) => {
    const DetalleConsumo = sequelize.define("detalle_consumo", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: Sequelize.INTEGER,
            defaultValue:1
        }
    });
    return DetalleConsumo;
}