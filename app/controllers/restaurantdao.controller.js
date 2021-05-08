const db = require('../models');
const Restaurant = db.Restaurant;

exports.create = async (req, res) => {
    //Validar el request
    if(!req.body.nombre){
        res.status(400).send({
            message: "Debe enviar el nombre del restaurant"
        })
    }
    const restaurant = req.body;
    try {
        const data = await Restaurant.create(restaurant);
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al crear un restaurant."
        });
    }
}
exports.findOne = async(req, res) =>{
    const {id} = req.params;
    try {
        const data  = await Restaurant.findByPk(id);
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener venta con id=" + id
        });
    }
}