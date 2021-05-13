module.exports= app=>{
    const cliente= require("../controllers/clientedao.controller.js");
    var router= require("express").Router();
    router.post("/",cliente.create);
    router.get("/:id",cliente.findOne);
    router.get("/",cliente.findAll);
    router.get("/cedula/:ci",cliente.findByCedulaRest);
    app.use('/api/cliente',router);
};