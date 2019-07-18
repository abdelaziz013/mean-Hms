const Opc = require("../models/opc");
const OpcShift = require("../models/opc-shift");
const OpcRoster = require('../models/opc-roster');

// add opc
exports.addOpc =(req,res,next)=>{
  const opc = new Opc({
    name: req.body.name,
    creator: req.userData.userId
  });
  opc.save().then(savedOpc => {
    res.status(200).json({
      message: "new opc added"
    });
  });
}


// get opcList
exports.getOpcList = (req,res,next)=>{
  Opc.find().then(opc => {
    res.status(200).json({
      opc
    });
  });
}

// delete opc
exports.deleteOpc =(req,res,next)=>{
  Opc.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: "one record deletet"
    });
  })
}

// add opc shift
exports.addOpcShift =(req,res,next)=>{
  const opcShift = new OpcShift({
    shiftName: req.body.shiftName,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    creator: req.userData.userId
  });

  opcShift
    .save()
    .then(savedShift => {
      res.status(200).json({
        message: "new shift saved"
      });
    })
    .catch(error => {
      res.status(404).json({
        message: "shift not saved"
      });
    });
}

// get opc-shift list
exports.getOpcShiftList =(req,res,next)=>{
  OpcShift.find({})
    .then(opcShift => {
      res.status(200).json({
        opcShift
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "shift not found"
      });
    });
}

// delete opcShift
exports.deleteOpcShift =(req,res,next)=>{
  OpcShift.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: "one record deletet"
    });
  });
}

// assign shift
exports.assignShift =(req,res,next)=>{
  const opcRoster = new OpcRoster({
    date: req.body.date,
    shift: req.body.shift,
    opc: req.body.opc,
    doctor: req.body.doctor,
    creator: req.userData.userId
  })
  opcRoster.save().then(saverRoster => {
    res.status(200).json({
      message: "new roster added"
    });

  })
    .catch(error => {
      res.status(500).json({
        message: "shift not found"
      });
    })
}


// get Opc Roster
exports.getOpcRoster =(req,res,next)=>{
  const pageSize = +req.query.pagesize,
  currentPage = +req.query.page,
  rosterQuery = OpcRoster.find();
let fetchedRoster

if(pageSize&&currentPage){
rosterQuery
.skip(pageSize*(currentPage-1))
.limit(pageSize)
}
rosterQuery
.populate('shift')
.populate('opc')
.populate('doctor')
.then(roster=>{
fetchedRoster = roster
return OpcRoster.count()
}).then(count=>{

  res.status(200).send({
  roster:fetchedRoster,
  maxCount:count
})
})
}

// get roster by id
exports.getRosterById =(req,res,next)=>{
  OpcRoster.findById(req.params.id)
  .then(roster=>{
    if(roster){
      res.status(200).json({
        roster
      })
    }else{
      return res.status(404).json({ message: 'roster not found' })
    }
  })
}

// update roster
exports.updateRoster =(req,res,next)=>{
  const opcRoster = new OpcRoster({
    _id:req.params.id,
    date: req.body.date,
    shift: req.body.shift,
    opc: req.body.opc,
    doctor: req.body.doctor,
    creator: req.userData.userId
  })

  OpcRoster.updateOne({_id:req.params.id},opcRoster).then(result=>{
    res.status(200).json({
      message:"one record updated"
    })
  })

}


// delete Roster
exports.deleteRoster =(req,res,next)=>{   
  OpcRoster.deleteOne({_id:req.params.id}).then(result=>{
   
    res.status(200).json({
      message:'one record deleted'
    })
  })
}