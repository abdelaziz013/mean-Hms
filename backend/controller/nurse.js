const Nurse = require('../models/nurse');
const NurseShift =require('../models/nurse-shift');
const NurseRoster =require('../models/nurse-roster');


// add nurse
exports.addNurse = (req,res,next)=>{
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
}

// get nurse list
exports.getNurseList =(req,res,next)=>{
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
}


// get nurse by id
exports.getNurseById = (req,res,next)=>{
  Nurse.findById(req.params.id).then(nurse=>{
    if(nurse){
      res.status(200).json({
        nurse
      })
    }else{
      return res.status(404).json({ message: 'reception not found' })
    }
  })
}

// update nurse
exports.editNurseById = (req,res,next)=>{
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

}

// delete nurse
exports.deleteNurse =(req,res,next)=>{
  Nurse.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record deleted'
    })
  })
}

// add shift
exports.addShift = (req,res,next)=>{
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
}

// get shift list
exports.getShiftList =(req,res,next)=>{
  const nuserQuery =NurseShift.find({});
  nuserQuery.then(nurseShift=>{
    res.status(200).json({
      nurseShift
    })
  })
}

// delete shift
exports.deleteShift =(req,res,next)=>{
  NurseShift.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record deleted'
    })
  })
}

// save Roster
exports.addRoster =(req,res,next)=>{
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
}

// get nurse Roster
exports.getRoster =(req,res,next)=>{
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
}

// get roster by id
exports.getRosterById =(req,res,next)=>{
  NurseRoster.findById(req.params.id).then(roster=>{
    if(roster){
      res.status(200).json({
        roster
      })
    }else{
      return res.status(404).json({ message: 'roster not found' })
    }
  })
}


// edit roster
exports.editRoster =(req,res,next)=>{
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
}


// delete roster
exports.deleteRoster =(req,res,next)=>{
  NurseRoster.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record delted'
    })
  })
}