module.exports = app =>{
    const restaurantDao = require('../controllers/restaurantdao.controller');
    const router = require('express').Router();
    router.post('/api/restautrant', restaurantDao.create);
    app.use(router);
}