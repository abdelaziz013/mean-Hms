
const express = require('express'),
  router = express.Router(),
  checkAuth = require('../middleware/check-auth'),
  medicineController = require('../controller/medicine')


// add medicine
router.post('/add-medicne', checkAuth,medicineController.addMedicine)

// get medicine list
router.get('/list', checkAuth,medicineController.getMedicineList)


// get medicine by ID
router.get('/:id',checkAuth,medicineController.getMedicineById)

// edit medicine
router.put('/edit-medicine/:id',checkAuth,medicineController.editMedicineById)


// delete
router.delete('/:id',checkAuth,medicineController.deleteMedicine)





module.exports = router;


