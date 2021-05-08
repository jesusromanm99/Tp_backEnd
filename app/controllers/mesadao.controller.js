const db = require('../models');
const Mesa = db.Mesa;

exports.create = async (req, res) => {
    //Validar el request
    if(!req.body.nombre){
        res.status(400).send({
            message: "Debe enviar el nombre de la mesa"
        })
    }
    const mesa = req.body;
    try {
        const data = await Mesa.create(mesa);
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al crear una mesa."
        });
    }
}
exports.findOne = async(req, res) =>{
    const {id} = req.params;
    try {
        const data = await Mesa.findByPk(id);
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: "No se encontro la mesa " + id
            });
        }
        
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener mesa con id=" + id
        });
    }
}

exports.update = async(req, res) => {
    //Validar el request
    if(!req.body.nombre || !req.body.id){
        res.status(400).send({
            message: "Debe enviar el nombre y id de la mesa"
        })
    }
    const {id, nombre, posicion_x, posicion_y, planta} = req.body;
    try {
        const mesa = await Mesa.findByPk(id);
        mesa.nombre = nombre;
        mesa.posicion_x = posicion_x;
        mesa.posicion_y = posicion_y;
        mesa.planta = planta;
        const data = await mesa.save();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al actualizar una mesa."
        });
    }
}
exports.delete = async(req, res) =>{
    const {id} = req.params;
    try {
        const mesa  = await Mesa.findByPk(id);
        const data = await mesa.destroy();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar mesa con id=" + id
        });
    }
}