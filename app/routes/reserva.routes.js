module.exports= app=>{
    const reserva= require("../controllers/reservadao.controllers.js");
    var router= require("express").Router();
    router.post("/",reserva.create);
    router.get("/:id",reserva.findOne);
    router.get("/",reserva.findAll);
    router.get("/mesas/:id_res/:fecha/:hora_i/:hora_f",reserva.getReservasOcupadas2);
    router.get("/restaurante/:id_res",reserva.getReservasByRestaurantes);
    router.get("/fecha/:fecha",reserva.getReservasByFecha);
    router.get("/cliente/:cliente",reserva.getReservasByCliente);


    app.use('/api/reserva',router);
};