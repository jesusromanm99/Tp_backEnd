module.exports= app=>{
    const reserva= require("../controllers/reservadao.controllers.js");
    var router= require("express").Router();
    router.post("/",reserva.create);
    router.get("/:id",reserva.findOne);
    router.get("/",reserva.findAll)
    router.get("/mesas/:id_res/:fecha/:hora_i/:hora_f",reserva.getReservasOcupadas)
    app.use('/api/reserva',router);
};