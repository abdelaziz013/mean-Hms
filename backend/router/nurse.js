
const express = require('express');
const router = express.Router();
const Nurse = require('../models/nurse');
const NurseShift =require('../models/nurse-shift');
const NurseRoster =require('../models/nurse-roster');
const checkAuth = require('../middleware/check-auth');

// add nurse
router.post('/add-nurse',checkAuth,(req,res)=>{
  const nurse = new Nurse({
    name:req.body.name,
    phone:req.body.phone,
    address:req.body.address,
    creator:req.userData.userId
  })
  nurse.save().then(savedNurse=>{
    res.status(200).json({
      message:'new nurse added',
      savedNurse
    })
  }).catch(error => {
    res.status(404).json({
      message:error.message
  });
  })
})

// get nurses
router.get('/nurse-list',(req,res)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const nuserQuery =Nurse.find();
  let fetchedNurse;
  if(pageSize&&currentPage){
    nuserQuery
    .skip(pageSize*(currentPage-1))
    .limit(pageSize)
  }
  nuserQuery
  .then(nurseList=>{
    fetchedNurse=nurseList;
    return Nurse.count()
  }).then(count=>{
    res.status(200).send({
      nurses:fetchedNurse,
      maxCount:count
    })
  })
})

// getnurse by id
router.get('/:id',checkAuth,(req,res)=>{
  Nurse.findById(req.params.id).then(nurse=>{
    if(nurse){
      res.status(200).json({
        nurse
      })
    }else{
      return res.status(404).json({ message: 'reception not found' })
    }
  })
})

// update nurse
router.put('/edit/:id',checkAuth,(req,res)=>{
  const nurse = new Nurse({
    _id:req.params.id,
    name:req.body.name,
    phone:req.body.phone,
    address:req.body.address,
    creator:req.userData.userId
  })
  Nurse.updateOne({_id:req.params.id},nurse).then(result=>{
    res.status(200).json({
          message:"one record updated"
    })
  })
})

// delete nurse
router.delete('/:id',(req,res)=>{
  Nurse.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      messahe:'one record deleted'
    })

  })
})


// addshift
router.post('/add-shift',checkAuth,(req,res)=>{
  const nurseShift = new NurseShift({
    shiftName :req.body.shiftName,
    startTime:req.body.startTime,
    endTime:req.body.endTime,
    creator:req.userData.userId
  })

  nurseShift.save().then(savedShift=>{
    res.status(200).json({
      message:'new shift saved'
    })
  })
})

// get shiftList
router.get('/list/shift',checkAuth,(req,res)=>{
  const nuserQuery =NurseShift.find({});
  nuserQuery.then(nurseShift=>{
    res.status(200).json({
      nurseShift
    })
  })

})

// delete shift
router.delete('/deleteshift/:id',(req,res)=>{
  NurseShift.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record deleted'
    })
  })
})

// save roster
router.post('/add-roster',checkAuth,(req,res)=>{
  const nurseRoster = new NurseRoster({
    date : req.body.date,
    nurseShift: req.body.nurseShift,
    nurse:req.body.nurse,
    creator:req.userData.userId
  })

  nurseRoster.save().then(savedRoster=>{
    console.log(savedRoster);
    res.status(200).json({
      message:"one record saved"
    })
  })
})


// get nurseroster
router.get('/roster/list',(req,res)=>{
  const pageSize = +req.query.pagesize,
        currentPage = +req.query.page,
        rosterQuery = NurseRoster.find();
  let fetchedRoster

  if(pageSize&&currentPage){
    rosterQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }
  rosterQuery
    .populate('nurseShift')
    .populate('nurse')
    .then(roster=>{
      fetchedRoster = roster
      return NurseRoster.count()
    }).then(count=>{
          res.status(200).send({
        roster:fetchedRoster,
        maxCount:count
      })
    })

})

// get roster by id
router.get("/nurse-roster/:id",(req,res)=>{
  NurseRoster.findById(req.params.id).then(roster=>{
    if(roster){
      res.status(200).json({
        roster
      })
    }else{
      return res.status(404).json({ message: 'roster not found' })
    }
  })
})

// edit roster
router.put('/edit-roster/:id',checkAuth,(req,res)=>{
  const nurseRoster = new NurseRoster({
    _id:req.params.id,
    date : req.body.date,
    nurseShift: req.body.nurseShift,
    nurse:req.body.nurse,
    creator:req.userData.userId
  })

  NurseRoster.updateOne({_id:req.params.id},nurseRoster).then(result=>{
    res.status(200).json({
      message:"one record updated"
    })
  })
})
//  delete roster
router.delete('/del-roster/:id',(req,res)=>{
  NurseRoster.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record delted'
    })
  })
})




module.exports = router;
