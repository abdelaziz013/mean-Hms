const express = require("express"),
  router = express.Router(),
  checkAuth = require("../middleware/check-auth");
  const patientController =require('../controller/patient')

// add patient
router.post("/add-patient",checkAuth,patientController.addPatient);

// get in-patient
router.get("/in-patient",checkAuth, patientController.getInpatient);

//get out patient
router.get("/out-patient",checkAuth,patientController.getOutPatient );

// get patient by id
router.get("/patient/:id",checkAuth,patientController.getPatientById );

// get edit-patient by id
router.get("/edit-patient/:id", patientController.getEditPatientById);

// update patient
router.put("/edit/:id", checkAuth, patientController.updatePatient);


// put discharge date
router.put("/discharge-inpatient/:id",checkAuth,patientController.addDischargeDate );

// add patient Bill
router.post("/add-bill/:id", checkAuth,patientController.addPatientBill);

// bill list
router.get("/bill-list",patientController.getBillList );

// get bill by id
router.get('/print-bill/:id',patientController.getBillById)


// get bill by patient id
router.get('/patient-bill/:id', patientController.getBillByPatientId)



// delete patient-bill-change room status
router.delete('/delete-patient/:id', checkAuth,patientController.deleteBill )



module.exports = router;
