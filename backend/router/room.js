const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const roomController =require ('../controller/room.js');





// save room
router.post('/add-room', checkAuth,roomController.addRoom)

// get room list
router.get('/room-list',roomController.getRoomList )

// get empty room
router.get('/emptyroom-list',roomController.getEmptyRoom)


// get room by id
router.get('/:id',checkAuth,roomController.getRoomById )

// edit room
router.put('/edit-room/:id', checkAuth,roomController.editRoom)

// delete one
router.delete('/del-room/:id',roomController.deleteRoom)






module.exports = router;
