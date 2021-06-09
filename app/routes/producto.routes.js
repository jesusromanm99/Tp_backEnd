module.exports = app =>{
    const productoDao = require('../controllers/productodao.controller');
    const router = require('express').Router();
    router.get("/", productoDao.findAll);
    router.get("/:id", productoDao.findOne);
    router.post('/', productoDao.create);
    router.put('/', productoDao.update);
    router.delete('/:id', productoDao.delete);
    app.use('/api/producto', router);
}