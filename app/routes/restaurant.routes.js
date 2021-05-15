module.exports = app =>{
    const restaurantDao = require('../controllers/restaurantdao.controller');
    const router = require('express').Router();
    router.get("/", restaurantDao.findAll);
    router.get("/:id", restaurantDao.findOne);
    router.get("/", restaurantDao.findAll);
    router.post('/', restaurantDao.create);
    router.put('/', restaurantDao.update);
    router.delete('/:id', restaurantDao.delete);

    
    app.use('/api/restaurant', router);
}