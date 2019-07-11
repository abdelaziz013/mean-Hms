
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Service = require('../models/service');


// add service
router.post('/add-service',checkAuth,(req,res)=>{

  const service = new Service({
        serviceName:req.body.serviceName,
        serviceCategory:req.body.serviceCategory,
        serviceCost:req.body.serviceCost,
        creator:req.userData.userId
  })

  service.save().then(savedService=>{
    res.status(200).json({
      message:'one service saved'
    })
  })
})

// get service list
router.get('/service-list',(req,res)=>{
  const pageSize = +req.query.pagesize,
        currentPage =+req.query.page,
        serviceQuery =Service.find();
  let fetchedService;

  if(pageSize&&currentPage){
    serviceQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }
  serviceQuery
    .then(service=>{
      fetchedService =service
      return Service.count()
    }).then(count=>{
      res.status(200).json({
        service:fetchedService,
        maxCount:count
      })
    })
})

// get service by id
router.get('/service/:id',(req,res)=>{
  Service.findById(req.params.id).then(service=>{
    if(service){
      res.status(200).json({
        service
      })
    }else{
      return res.status(404).json({ message: 'service not found' })
    }
  })
})


// edit service
router.put('/edit-service/:id',checkAuth,(req,res)=>{
  const service = new Service({
    _id:req.params.id,
    serviceName:req.body.serviceName,
    serviceCategory:req.body.serviceCategory,
    serviceCost:req.body.serviceCost,
    creator:req.userData.userId
})

Service.updateOne({_id:req.params.id},service).then(result=>{
  res.status(200).json({
    message:"one record updated"
  })
})

})

// delete service
router.delete('/del-service/:id',(req,res)=>{
  Service.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record deleted'
    })
  })
})













module.exports = router;

