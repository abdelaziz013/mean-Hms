const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const doctorControler = require('../controller/doctor')



// add doctor
router.post('/add-doctor', checkAuth,doctorControler.postDoctor )

// edit doctor
router.put('/edit-doctor/:id', checkAuth, doctorControler.editDoctor)

// get doctor list
router.get('',checkAuth,doctorControler.getDoctorList)

// get foctor by id
router.get('/:id', checkAuth, doctorControler.getDoctorById)

// delete doctor
router.delete('/:id', checkAuth,doctorControler.deleteDoctor)

module.exports = router;

