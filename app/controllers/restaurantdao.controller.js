const db = require('../models');
const Restaurant = db.Restaurant;

exports.create = async (req, res) => {
    //Validar el request
    if(!req.body.nombre){
        res.status(400).send({
            message: "Debe enviar el nombre del restaurant"
        })
    }
    else{
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
}
exports.findOne = async(req, res) =>{
    const {id} = req.params;
    try {
        const data = await Restaurant.findByPk(id);
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: "No se encontro el restaurant " + id
            });
        }
        
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener restaurant con id=" + id
        });
    }
}
exports.findAll = async (req, res) =>{
    Restaurant.findAll()
        .then(data =>{
            res.status(200).send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error en el servidor"
            });
        });
}
exports.update = async(req, res) => {
    //Validar el request
    if(!req.body.nombre || !req.body.id){
        res.status(400).send({
            message: "Debe enviar el nombre y id del restaurant"
        })
    }
    const {id, nombre, direccion} = req.body;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if(!restaurant){
            res.status(404).send({
                message: "No se encontro el restaurant " + id
            });
        }else{
            restaurant.nombre = nombre;
            restaurant.direccion = direccion;
            const data = await restaurant.save();
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al actualizar un restaurant."
        });
    }
}
exports.delete = async(req, res) =>{
    const {id} = req.params;
    try {
        const restaurant  = await Restaurant.findByPk(id);
        if(!restaurant){
            res.status(404).send({
                message: "No se encontro el restaurant " + id
            });
        }else{
            const data = await restaurant.destroy();
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar restaurant con id=" + id
        });
    }
}