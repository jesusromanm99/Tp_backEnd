const db = require('../models');
const db_s=require("../models/index");
const sequelize=db_s.sequelize;

const Consumo = db.Consumo;
const DetalleConsumo= db.DetalleConsumo
const  Mesa= db.Mesa
const  Producto = db.Producto

//funciones normales

//funcion que devulve todos los detalles de una cabecera
const getDetallesByCabecera= async  (id_cabecera)=>{
    let detalles
    if(id_cabecera){
        let consumo= await Consumo.findByPk(id_cabecera);
        if(consumo){ //el consumo Existe
            detalles= await  DetalleConsumo.findAll({
                where:{
                    id_cabecera:id_cabecera
                }
            });
        }
    }
    return detalles
}

//funcion que devuelve true o false de acuerdo si una mesa esta ocupada
const isTaken= async (id_mesa)=> {
    consumoMesa= await Consumo.findOne({
        where:{
            id_mesa:id_mesa,
            estado:'abierto'
        }
    });
    return consumoMesa  ? consumoMesa :  false;
}

//funcion que actualiza el total del consumo

const  actualizarTotal= async (id_consumo,monto)=>{
    consumo= await Consumo.findOne(
        {
        where:{
            id:id_consumo
        }
    })
    console.log('Este es el consumo',consumo)
    consumo.total+=monto;
    await consumo.save()
}




//funciones Rest
exports.create = async (req, res) => {
    //Validar el request
    if(!(req.body.id_mesa && req.body.id_cliente)){
        res.status(400).send({
            message: "Debe enviar el id_mesa, y id_cliente"
        });
    }else{
        const consumo = req.body;
        //consumo.fechaCreacion=new Date()
        try {
            const data = await Consumo.create(consumo);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Ha ocurrido un error al crear el consumo."
            });
        }
    }
}

exports.findAll=(req,res) => {
    Consumo.findAll()
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
        const data = await Consumo.findByPk(id);
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: "No se encontro el Consumo con id=" + id
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al obtener el Consumo con id=" + id
        });
    }
}

exports.update = async(req, res) => {
    //Validar el request
    if(!(req.body.id_cliente) ){
        res.status(400).send({
            message: "Debe enviar el nuevo id del Cliente"
        })
    }

    const {id, id_cliente} = req.body;
    try {
        const consumo = await Consumo.findByPk(id);
        if(!consumo){
            res.status(404).send({
                message: "No se encontro el Consumo con id=" + id
            });
        }
        else{
            consumo.id_cliente = id_cliente;
            const data = await consumo.save();
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al actualizar el Consumo."
        });
    }
}

exports.getDetalles=  async (req, res)=>{
    const {id_cosumo}= req.params;
    try{
        detalles= await DetalleConsumo.findAll({ //obtengo  los detalles de la messa
            where:{
                id_consumo:id_cosumo
            }
        })
        res.send(detalles)
    }catch (error){
            res.status(500).send({
                message: error.message || "Ha ocurrido un error al Obtener Detalles."
            });
    }

}

exports.addDetalles =  async (req, res)=>{
    if( !(req.body.id_consumo && req.body.id_producto && req.body.cantidad ) ){
        res.status(400).send({
            message: "Debe enviar el id_cabecera , id_mesa, cantidad"
        });
    }
    else{
        const detalle = req.body;
        try {
            const data = await DetalleConsumo.create(detalle);
            producto = await Producto.findByPk(detalle.id_producto)
            //console.log(producto)
            await actualizarTotal(data.id_consumo,producto.precio * data.cantidad) //por cada detalle actualiamos el total de consumo
            res.send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Ha ocurrido un error al agregar el detalle."
            });
        }
    }
}

exports.cerrarMesa= async (req,res)=>{
    const {id_consumo} = req.params
    consumo=await Consumo.findByPk(id_consumo);
    if(consumo){
        consumo.estado="cerrado"
        consumo.fechaCierre= new Date()
        data= await  consumo.save()
        res.send(data)
    }else{
        res.status(400).send(
            {message: "No existe ese id_consumo"}
        )
    }

}
exports.isTakenRest=async  (req, res)=>{
    const {id_mesa}=req.params
    data=await isTaken(id_mesa)
    if(data){
        res.send(data)
    }
    else{
        res.send({})
    }

}

