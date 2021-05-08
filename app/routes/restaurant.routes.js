module.exports = app =>{
    const restaurantDao = require('../controllers/restaurantdao.controller');
    const router = require('express').Router();
    
    router.get("/:id", restaurantDao.findOne);
    router.post('/', restaurantDao.create);
    router.put('/', restaurantDao.update);
    router.delete('/:id', restaurantDao.delete);
    
    app.use('/api/restaurant', router);
}