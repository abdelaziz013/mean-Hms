
const express = require('express'),
  router = express.Router(),
  checkAuth = require('../middleware/check-auth'),
  caseMangeController =require('../controller/case-mange')


// add diagnosis
router.post('/add-diagnosis/:id', checkAuth,caseMangeController.addDiagnosios )

// add prescreption
router.post('/add-prescription/:id', checkAuth,caseMangeController.addPrescreption )

// add patient-services
router.post('/add-service/:id', checkAuth,caseMangeController.addPatientService)


// get Diagnosis by patient id
router.get('/diagnisis/:id',caseMangeController.getDiagnosisByPatientId)

// get prescription
router.get('/presciption/:id',checkAuth,caseMangeController.getPrescription)


// get Patient Service
router.get('/service/:id',caseMangeController.getPatientService)

// edit diagnosis
router.put('/edit/:id',checkAuth,caseMangeController.editDiagnosis)

// delete diagnosis
router.delete('/delete/:id',checkAuth,caseMangeController.deleteDiagnosis)

// delete service
router.delete('/deleteservice/:id',caseMangeController.deleteService)


// delet pres
router.delete('/deletepres/:id',caseMangeController.deletePrescription)









module.exports = router
