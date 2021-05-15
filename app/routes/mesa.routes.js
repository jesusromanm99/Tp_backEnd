module.exports = app =>{
    const mesaDao = require('../controllers/mesadao.controller');
    const router = require('express').Router();
    router.get("/", mesaDao.findAll);
    router.get("/:id", mesaDao.findOne);
    router.post('/', mesaDao.create);
    router.put('/', mesaDao.update);
    router.delete('/:id', mesaDao.delete);
    router.get("/restaurantes/:idRes", mesaDao.findAllByRestaurant);
    app.use('/api/mesa', router);
}