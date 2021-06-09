const db = require('../models');
const Producto = db.Producto;

exports.create = async (req, res) => {
    //Validar el request
    console.log(req.body)
    if(!req.body.nombre || !req.body.precio || !req.body.id_categoria ){
        res.status(400).send({
            message: "Debes pasar todos los datos: nombre, precio , id_categoria "
        });
    }else{
        const producto = req.body;
        try {
            const data = await Producto.create(producto);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Ha ocurrido un error al crear el producto."
            });
        }
    }
}

exports.findAll=(req,res) => {
    Producto.findAll()
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
        const data = await Producto.findByPk(id);
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: "No se encontro el producto con id=" + id
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al obtener el producto con id=" + id
        });
    }
}

exports.update = async(req, res) => {
    //Validar el request
    if(!req.body.nombre || !req.body.precio || !req.body.id_categoria ){
        res.status(400).send({
            message: "Debe enviar los siguientes valores a actualizar: nombre,precio, categoria"
        })
    }
    const {id, nombre,precio,id_categoria} = req.body;
    try {
        const producto = await Producto.findByPk(id);
        if(!producto){
            res.status(404).send({
                message: "No se encontro el Producto con id=" + id
            });
        }
        else{
            producto.nombre = nombre;
            producto.precio=precio;
            producto.id_categoria=id_categoria
            const data = await producto.save();
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al actualizar el Producto."
        });
    }
}
exports.delete = async(req, res) =>{
    const {id} = req.params;
    try {
        const producto  = await Producto.findByPk(id);
        const data = await Producto.destroy();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar Producto con id=" + id
        });
    }
}