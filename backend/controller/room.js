
const Room = require('../models/room');

// add room
exports.addRoom =(req,res,next)=>{
  
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
}

// get room list
exports.getRoomList =(req,res,next)=>{
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
}

// getEmpty Room
exports.getEmptyRoom =(req,res,next)=>{
  Room.find({ roomStatus:'empty'}).then(emptyRoom => {
    res.status(200).json({
      emptyRoom
    })
  }).catch(error => {
    res.status(500).json({
      error: error
    });
  });
}

// get room by id
exports.getRoomById =(req,res,next)=>{
  Room.findById(req.params.id).then(room => {
    if (room) {
      res.status(200).json({
        room
      })
    } else {
      return res.status(404).json({ message: 'room not found' })
    }
  })
}


// edit Room
exports.editRoom =(req,res,next)=>{
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

}

// delete room
exports.deleteRoom = (req,res,next)=>{
  Room.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result)
    res.status(200).json({
      messagge: 'one record deleted'
    })
  })
}
