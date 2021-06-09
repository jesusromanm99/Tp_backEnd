const db = require('../models');
const Categoria = db.Categoria;

exports.create = async (req, res) => {
    //Validar el request
    if(!req.body.nombre){
        res.status(400).send({
            message: "Debe enviar el nombre de la categoria"
        });
    }else{
        const categoria = req.body;
        try {
            const data = await Categoria.create(categoria);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Ha ocurrido un error al crear la categoria."
            });
        }
    }
}

exports.findAll=(req,res) => {
    Categoria.findAll()
        .then(data =>{
            res.status(200).send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error en el servidor"
            });
        });
};

exports.findOne = async(req, res) =>{
    const {id} = req.params;
    try {
        const data = await Categoria.findByPk(id);
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: "No se encontro la categoria con id=" + id
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al obtener categoria con id=" + id
        });
    }
}

exports.update = async(req, res) => {
    //Validar el request
    if(!req.body.nombre ){
        res.status(400).send({
            message: "Debe enviar el nuevo nombre de la categoria"
        })
    }
    const {id, nombre} = req.body;
    try {
        const categoria = await Categoria.findByPk(id);
        if(!categoria){
            res.status(404).send({
                message: "No se encontro la Categoria con id=" + id
            });
        }
        else{
            categoria.nombre = nombre;
            const data = await categoria.save();
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al actualizar la categoria."
        });
    }
}
exports.delete = async(req, res) =>{
    const {id} = req.params;
    try {
        const categoria  = await Categoria.findByPk(id);
        const data = await categoria.destroy();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar categoria con id=" + id
        });
    }
}