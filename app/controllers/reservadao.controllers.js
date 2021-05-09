const db_models = require('../models');

const Reserva =db_models.Reserva;
const MesaDao=db_models.Mesa;
const Client= require("../controllers/clientedao.controller.js");
const Mesa= require("../controllers/mesadao.controller.js");
const Restaraurant= require("../controllers/restaurantdao.controller.js");

exports.findAll=(req,res) => {
    Reserva.findAll()
        .then(data =>{
            res.status(200).send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error en el servidor"
            });
        });
};


exports.findOne=(req,res) => {
    const pk= req.params.id;
    Reserva.findByPk(pk)
        .then(data=>{
            if (data==null){
                res.status(404).send({
                    message:"Reserva con  id="+pk+" no existe"
                });
            }else {
                res.status(200).send(data);
            }
        })
        .catch(err=>{
            res.status(400).send({
                message:"Error al obtener cliente id="+pk+" no existe"
            });
        });
};

exports.create=(req,res)=>{

    //Verifico que se envie los parametros
    if (!req.body.id_mesa){
        res.status(404).send({
            message:"Debe enviar el id de la mesa"
        })
    }
    else if (!req.body.id_restaurante){
        res.status(404).send({
            message:"Debe enviar el id del restaurante"
        })
    }
    else if (!req.body.id_cliente){
        res.status(404).send({
            message:"Debe enviar el id del cliente"
        })
    }

    var reserva={
        fecha:req.body.fecha,
        hora_inicial:  req.body.hora_inicial,
        hora_final: req.body.hora_final,
        id_mesa:  req.body.id_mesa,
        id_restaurante:  req.body.id_restaurante,
        id_cliente: req.body.id_cliente,
        cantidad_solicitada: req.body.cantidad_solicitada
    }
    Reserva.create(reserva)
        .then(data=>{
            res.status(200).send(data)
        }).catch( err => {
            res.status(500).send({
                message:"Ocurrio un error al crear el cliente"
            });
    });
}

exports.getReservasOcupadas=(req,res)=>{
    //filtro todas las reservas que tiene lugar esa hora
    Reserva.findAll({
        where: {
            id_restaurante: req.params.id_res,
            fecha: req.params.fecha,
            hora_inicial: req.params.hora_i,
            hora_final: req.params.hora_f
        },
        attributes: ['id_mesa']
    }).then( data => {
        console.log(data)
        res.send(data)
        })
       .catch( err=> {
            res.status(500).send({
                message: "Error en el servidor"
            })
        })
}

exports.getReservasByRestaurantes=(req,res)=>{
    Reserva.findAll({
        where: {
            id_restaurante: req.params.id_res,
        },
        order:[["hora_final","ASC"],["id_mesa","ASC"]]
    }).then( data => {
        console.log(data)
        res.status(200).send(data)
    })
        .catch( err=> {
            res.status(500).send({
                message: "Error en el servidor"
            })
        })
}

exports.getReservasByFecha=(req,res)=>{
    Reserva.findAll({
        where: {
            fecha: req.params.fecha,
        },
        order:[["hora_final","ASC"],["id_mesa","ASC"]],
    }).then( data => {
        console.log(data)
        res.status(200).send(data)
    })
        .catch( err=> {
            res.status(500).send({
                message: "Error en el servidor"
            })
        })
}


exports.getReservasByCliente=(req,res)=>{
    Reserva.findAll({
        where: {
            id_cliente: req.params.cliente,
        },
        order:[["hora_final","ASC"],["id_mesa","ASC"]]
    }).then( data => {
        console.log(data)
        res.status(200).send(data)
    })
        .catch( err=> {
            res.status(500).send({
                message: "Error en el servidor"
            })
        })
}