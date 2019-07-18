
const express = require('express');
const router = express.Router();
const checkAuth =require ('../middleware/check-auth')
const receptionController = require('../controller/reception')


// add reception
router.post('/add-reception',checkAuth,receptionController.addReception)


// get receptionList
router.get('/reception-list',checkAuth,receptionController.getReceptionList)


  // delete reception
  router.delete('/del-reception/:id',checkAuth,receptionController.deleteReception)

  // get reception by id
  router.get('/:id',checkAuth,receptionController.getReceptionById)

  // update reception
  router.put('/edit-reception/:id',checkAuth,receptionController.updateReception)


module.exports = router;
