module.exports = app =>{
    const restaurantDao = require('../controllers/restaurantdao.controller');
    const router = require('express').Router();
    
    router.get("/:id", restaurantDao.findOne);
    router.post('/', restaurantDao.create);

    app.use('/api/restaurant', router);
}