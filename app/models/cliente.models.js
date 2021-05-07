module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        cedula:{
            type:Sequelize.INTEGER,
            unique:true
        }
    });
    return Cliente;
}