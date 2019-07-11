
const express = require('express'),
  router = express.Router(),
  checkAuth = require('../middleware/check-auth'),
  Diagnosis = require('../models/diagnosis'),
  Prescreption = require('../models/prescreption'),
  PService = require('../models/patient-service'),
  Patient =require('../models/patient')


// add diagnosis
router.post('/add-diagnosis/:id', checkAuth, (req, res) => {
  Diagnosis.findOne({ patient: req.params.id }).then(diagnosis => {
    if (diagnosis) {
      res.status(401).json({
        message: 'diagnosis has been done before'
      })

    } else {
      const diagnosis = new Diagnosis({
        symptoms: req.body.symptoms,
        signs: req.body.signs,
        pastHistory: req.body.pastHistory,
        diagnosis: req.body.diagnosis,
        patient: req.params.id,
        creator: req.userData.userId
      })

      diagnosis.save().then(savedDiagnosis => {
        Patient.findOne({_id:req.params.id}).then(patient=>{
          res.status(200).json({
            patient,
            message: 'new diagnosis added'
          })
        })
      })
    }
  })
})

// add prescreption
router.post('/add-prescription/:id', checkAuth, (req, res) => {

  const newPrescribtion = new Prescreption({
    dose: req.body.dose,
    patient: req.params.id,
    medicine: req.body.medicine,
    creator: req.userData.userId
  })
  newPrescribtion.save().then(savedPresceiption => {
    Patient.findOne({_id:req.params.id}).then(patient=>{
      res.status(200).json({
        patient,
        message: 'new pprescription added'
      })
    })
  })
})

// add patient-services
router.post('/add-service/:id', checkAuth, (req, res) => {
  const service = new PService({
    patient: req.params.id,
    pService: req.body.pService,
    creator: req.userData.userId
  })
  service.save().then(savedService => {
    Patient.findOne({_id:req.params.id}).then(patient=>{
      res.status(200).json({
        patient,
        message: 'new pprescription added'
      })
    })
  })
})


// get Diagnosis by patient id
router.get('/diagnisis/:id',(req,res)=>{
  Diagnosis.findOne({patient: req.params.id}).then(diagnosis=>{
    res.status(200).json({
      diagnosis,
      message:'one diagnosis found'
    })

  })
})

// get prescription
router.get('/presciption/:id',checkAuth,(req,res)=>{
  Prescreption.find({patient: req.params.id})
  .populate('medicine')
  .then(pres=>{
    if(pres){
      res.status(200).json({
        pres,
        message:"patient prescription"
      })

    }else{
      res.status(404).json({
        message:"no presciption found"
      })
    }

  })
})


// get Patient Service
router.get('/service/:id',(req,res)=>{
  PService.find({patient: req.params.id})
  .populate('pService')
      .then(pService=>{
        if(pService){
          res.status(200).json({
            pService,
            message:"pService was found"
          })
        }
        // }else{
        //   res.status(404).json({
        //     message:'no service was found'
        //   })
        // }
      })
})

// edit diagnosis
router.put('/edit/:id',checkAuth,(req,res)=>{
  const diagnosis = new Diagnosis({
    _id:req.body._id,
    symptoms: req.body.symptoms,
    signs: req.body.signs,
    pastHistory: req.body.pastHistory,
    diagnosis: req.body.diagnosis,
    patient: req.params.id,
    creator: req.userData.userId
  })

  Diagnosis.updateOne({patient: req.params.id},diagnosis).then(result=>{
    res.status(200).json({
      message:"one record updated"
    })
  })
})

// delete diagnosis
router.delete('/delete/:id',(req,res)=>{
  Diagnosis.deleteOne({patient: req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record Deleted'
    })
  })
})

// delete service
router.delete('/deleteservice/:id',(req,res)=>{

  PService.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record Deleted'
    })
  })
})


// delet pres

router.delete('/deletepres/:id',(req,res)=>{
  Prescreption.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record Deleted'
    })
  })
})









module.exports = router
