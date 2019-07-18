const Service = require('../models/service');



// add service
exports.addService = (req, res, next) => {
  const service = new Service({
    serviceName: req.body.serviceName,
    serviceCategory: req.body.serviceCategory,
    serviceCost: req.body.serviceCost,
    creator: req.userData.userId
  })

  service.save().then(savedService => {
    res.status(200).json({
      message: 'one service saved'
    })
  })
}


// get Service list

exports.getServiceList = (req, res, next) => {
  const pageSize = +req.query.pagesize,
    currentPage = +req.query.page,
    serviceQuery = Service.find();
  let fetchedService;

  if (pageSize && currentPage) {
    serviceQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }
  serviceQuery
    .then(service => {
      fetchedService = service
      return Service.count()
    }).then(count => {
      res.status(200).json({
        service: fetchedService,
        maxCount: count
      })
    })
}

// get service by id
exports.getServiceById = (req, res, next) => {
  Service.findById(req.params.id).then(service => {
    if (service) {
      res.status(200).json({
        service
      })
    } else {
      return res.status(404).json({ message: 'service not found' })
    }
  })
}


// edit Service
exports.editService = (req, res, next) => {
  const service = new Service({
    _id: req.params.id,
    serviceName: req.body.serviceName,
    serviceCategory: req.body.serviceCategory,
    serviceCost: req.body.serviceCost,
    creator: req.userData.userId
  })

  Service.updateOne({ _id: req.params.id }, service).then(result => {
    res.status(200).json({
      message: "one record updated"
    })
  })

}

// delete Service
exports.deleteService = (req, res, next) => {
  Service.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: 'one record deleted'
    })
  })
}
