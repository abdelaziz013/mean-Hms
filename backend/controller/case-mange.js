
const Diagnosis = require('../models/diagnosis'),
  Prescreption = require('../models/prescreption'),
  PService = require('../models/patient-service'),
  Patient = require('../models/patient')


  // add diagnosis
  exports.addDiagnosios = (req,res,next)=>{
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
  }

// add prescription
exports.addPrescreption =(req,res,next)=>{

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
}

// add patient service
exports.addPatientService =(req,res,next)=>{
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
}

//get diagnosis by patient Id
exports.getDiagnosisByPatientId =(req,res,next)=>{
  Diagnosis.findOne({patient: req.params.id}).then(diagnosis=>{
    res.status(200).json({
      diagnosis,
      message:'one diagnosis found'
    })

  })
}

// get prescreption
exports.getPrescription =(req,res,next)=>{
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
}

// get patient Service
exports.getPatientService =(req,res,next)=>{
  PService.find({patient: req.params.id})
  .populate('pService')
      .then(pService=>{
        if(pService){
          res.status(200).json({
            pService,
            message:"pService was found"
          })
        }
      })
}


// edit diagnosis

exports.editDiagnosis =(req,res,next)=>{
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
}

// delete diagnosis
exports.deleteDiagnosis =(req,res,next)=>{
  Diagnosis.deleteOne({patient: req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record Deleted'
    })
  })
}


// delelt service
exports.deleteService =(req,res,next)=>{
  PService.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record Deleted'
    })
  })
}


//delete pres
exports.deletePrescription =(req,res,next)=>{
  Prescreption.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record Deleted'
    })
  })

}
