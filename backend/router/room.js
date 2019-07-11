const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Room = require('../models/room');






// save room
router.post('/add-room', checkAuth, (req, res) => {

  const room = new Room({
    roomType: req.body.roomType,
    roomNumber: req.body.roomNumber.toUpperCase(),
    roomCost: req.body.roomCost,
    roomStatus: req.body.roomStatus,
    creator: req.userData.userId
  })

  room.save().then(savedRoom => {
    res.status(200).json({
      message: 'one room saved'
    })
  })
  .catch(error => {
    res.status(404).json({
      message:error.message
  });
})
})

// get room list
router.get('/room-list', (req, res) => {
  const pageSize = +req.query.pagesize,
    currentPage = +req.query.page,
    roomQuery = Room.find()
  let fetchedRoom

  if (pageSize && currentPage) {
    roomQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }
  roomQuery.then(roomList => {
    fetchedRoom = roomList;
    return Room.count();
  }).then(count => {
    res.status(200).json({
      room: fetchedRoom,
      maxCount: count
    })
  })
})

// get empty room
router.get('/emptyroom-list', (req, res) => {


  Room.find({ roomStatus:'empty'}).then(emptyRoom => {
    res.status(200).json({
      emptyRoom
    })
  }).catch(error => {
    res.status(500).json({
      error: error
    });
  });
})


// get room by id
router.get('/:id', (req, res) => {
  Room.findById(req.params.id).then(room => {
    if (room) {
      res.status(200).json({
        room
      })
    } else {
      return res.status(404).json({ message: 'room not found' })
    }
  })
})

// edit room
router.put('/edit-room/:id', checkAuth, (req, res) => {
  Room.findOne({ _id: req.params.id }).then(room => {
    room.roomType = req.body.roomType,
        room.roomNumber = req.body.roomNumber,
        room.roomCost = req.body.roomCost,
        room.roomStatus = room.roomStatus,
        room.creator = req.userData.userId

    room.save().then(savedRoom => {
             res.status(200).json({
      message: "one record updated"
    })
    }).catch(error => {
      res.status(404).json({
        message:error.message
    });
    

    })
})





  // const room = new Room({
  //   _id: req.params.id,
  //   roomType: req.body.roomType,
  //   roomNumber: req.body.roomNumber,
  //   roomCost: req.body.roomCost,
  //   creator: req.userData.userId
  // })

  // Room.updateOne({ _id: req.params.id }, room).then(updatedRoom => {
  //      res.status(200).json({
  //     message: "one record updated"
  //   })
  // })
})

// delete one
router.delete('/del-room/:id', (req, res) => {
  Room.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result)
    res.status(200).json({
      messagge: 'one record deleted'
    })
  })
})






module.exports = router;
