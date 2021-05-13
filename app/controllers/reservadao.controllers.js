const db_models = require('../models');
const db=require("../models/index");
const sequelize=db.sequelize;

const { QueryTypes } = require('sequelize');
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
var validarCampos=(id_mesa, id_restaurante,id_cliente)=>{
    console.log(id_mesa,id_restaurante,id_cliente)
    if (!id_mesa){
        //res.status(404).send({
            console.log(id_mesa)
            return "Debe enviar el id de la mesa"
        //})
    }
    else if (!id_restaurante){
       // res.status(404).send({
        console.log(id_restaurante)
            return "Debe enviar el id del restaurante"
        //})
    }
    else if (!id_cliente){
        //res.status(404).send({
        console.log(id_cliente)
            return "Debe enviar el id del cliente"
        //})
    }
    else {
        console.log("Ningun lado")
    }
    return ""
}

exports.create=(req,res)=>{
    //Verifico que se envie los parametros
    const message=validarCampos(req.body.id_mesa,req.body.id_restaurante,req.body.id_cliente)
    console.log(message)
    if (message!=""){
        res.status(404).send({
            message:message
        })
        console.log("Aca entro")
    }else{
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
    };

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
        console.log('valor retornado',data)
        res.send(data)
        })
       .catch( err=> {
            res.status(500).send({
                message: "Error en el servidor"
            })
        })
}
exports.getReservasOcupadas2=(req,res)=>{
    //filtro todas las reservas que tiene lugar esa hora
    inicio=(parseInt(req.params.hora_i)+1).toString()
    fecha=new Date(req.params.fecha)
    sequelize.query(('SELECT id_mesa, fecha FROM reservas r WHERE ( :horaInicio between r.hora_inicial and r.hora_final-1  ' +
        ' or r.hora_final between :horaInicio2  and :horaFin  or :horaFin between r.hora_inicial+1 and r.hora_final  )   ' +
        ' and r.id_restaurante=:id_res'),
        {replacements:{horaInicio:[(req.params.hora_i)],
                       horaInicio2:[inicio],
                        horaFin:[req.params.hora_f],
                        id_res:[req.params.id_res],
                        }
        })
        .then(data=>{
            response=[]
           // console.log(data[0])
            data[0].forEach(elem=>{
                console.log(elem.fecha)
                console.log(fecha)
                fecha2=elem.fecha.getFullYear()+"-"+(elem.fecha.getMonth()+1)+"-"+elem.fecha.getDate()
                fecha3=fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDate()+1)
                console.log(fecha2,fecha3)
                if(fecha2==fecha3){
                    response.push(elem)
                }

            })
            res.send(response)
        }).catch(err=>{
            console.log("error:",err)
            res.status(500).send(err)
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
    console.log(req.params.fecha)
    Reserva.findAll({
        where: {
            fecha: req.params.fecha,
        },
        order:[["hora_final","ASC"],["id_mesa","ASC"]],
    }).then( data => {
       // console.log(data)
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