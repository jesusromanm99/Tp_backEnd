module.exports = app =>{
    const categoriaDao = require('../controllers/categoriadao.controller');
    const router = require('express').Router();
    router.get("/", categoriaDao.findAll);
    router.get("/:id", categoriaDao.findOne);
    router.post('/', categoriaDao.create);
    router.put('/', categoriaDao.update);
    router.delete('/:id', categoriaDao.delete);
    app.use('/api/categoria', router);
}