
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ServiceController =require('../controller/service')


// add service
router.post('/add-service',checkAuth,ServiceController.addService)

// get service list
router.get('/service-list',checkAuth,ServiceController.getServiceList)

// get service by id
router.get('/service/:id',checkAuth,ServiceController.getServiceById)


// edit service
router.put('/edit-service/:id',checkAuth,ServiceController.editService)

// delete service
router.delete('/del-service/:id',checkAuth,ServiceController.deleteService)













module.exports = router;

