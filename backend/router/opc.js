const express = require("express");
const router = express.Router();
checkAuth = require("../middleware/check-auth");
const Opc = require("../models/opc");
const OpcShift = require("../models/opc-shift");
const OpcRoster = require('../models/opc-roster')

// add opc
router.post("/add-opc", checkAuth, (req, res) => {
  const opc = new Opc({
    name: req.body.name,
    creator: req.userData.userId
  });
  opc.save().then(savedOpc => {
    res.status(200).json({
      message: "new opc added"
    });
  });
});

// get opclist
router.get("/opc-list", (req, res) => {
  Opc.find().then(opc => {
    res.status(200).json({
      opc
    });
  });
});

// delete opc
router.delete("/delete-opc/:id", (req, res) => {
  Opc.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: "one record deletet"
    });
  });
});

// add opc shift
router.post("/add-opcshift", checkAuth,(req, res) => {
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
});

// get opc-shift list

router.get("/opc-shift", (req, res) => {
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
});

// delete
router.delete("/delete-opcshift/:id", (req, res) => {
  OpcShift.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: "one record deletet"
    });
  });
});

// save assign shift
router.post('/assign-opcshift', checkAuth, (req, res) => {
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
})

// get roster
router.get('/roster/list',(req,res)=>{
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

})


// get roster by Id
router.get('/opc-roster/:id',(req,res)=>{
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
})


// update roster
router.put('/edit-roster/:id',checkAuth,(req,res)=>{
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

})

// delete roster
router.delete('/del-roster/:id',(req,res)=>{

  OpcRoster.deleteOne({_id:req.params.id}).then(result=>{
   
    res.status(200).json({
      message:'one record deleted'
    })
  })
})


module.exports = router;
