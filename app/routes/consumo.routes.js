module.exports = app =>{
    const consumoDao = require('../controllers/consumo.controller');
    const router = require('express').Router();
    router.get("/", consumoDao.findAll);
    router.get("/:id", consumoDao.findOne);
    router.get("/detalle/:id_cosumo", consumoDao.getDetalles);
    router.get("/estaOcupada/:id_mesa", consumoDao.isTakenRest);
    router.post('/', consumoDao.create);
    router.post('/addDetalle', consumoDao.addDetalles);
    router.put('/', consumoDao.update);
    router.put('/cerrarMesa/:id_consumo', consumoDao.cerrarMesa);
    app.use('/api/consumo', router);
}