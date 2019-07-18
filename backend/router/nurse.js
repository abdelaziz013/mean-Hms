
const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const nurseController = require('../controller/nurse')

// add nurse
router.post('/add-nurse',checkAuth,nurseController.addNurse)

// get nurses
router.get('/nurse-list',checkAuth,nurseController.getNurseList)

// getnurse by id
router.get('/:id',checkAuth,nurseController.getNurseById)

// update nurse
router.put('/edit/:id',checkAuth,nurseController.editNurseById)

// delete nurse
router.delete('/:id',nurseController.deleteNurse)


// addshift
router.post('/add-shift',checkAuth,nurseController.addShift)

// get shiftList
router.get('/list/shift',checkAuth,nurseController.getShiftList)

// delete shift
router.delete('/deleteshift/:id',checkAuth,nurseController.deleteShift)

// save roster
router.post('/add-roster',checkAuth,nurseController.addRoster)


// get nurseroster
router.get('/roster/list',nurseController.getRoster)

// get roster by id
router.get("/nurse-roster/:id",nurseController.getRosterById)

// edit roster
router.put('/edit-roster/:id',checkAuth,nurseController.editRoster)

//  delete roster
router.delete('/del-roster/:id',nurseController.deleteRoster)




module.exports = router;
