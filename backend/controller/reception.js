
const Reception = require('../models/reception');


// add reception
exports.addReception =(req,res,next)=>{
  const reception = new Reception({
    name:req.body.name,
    phone:req.body.phone,
    address:req.body.address,
    creator:req.userData.userId
  })
    reception.save().then(savedReception=>{
      res.status(200).json({
        message:'new reception added'
      })
    })
}

// get receptionList
exports.getReceptionList =(req,res,next)=>{
  const pageSize = +req.query.pagesize,
  currentPage = +req.query.page,
  receptionQuery =Reception.find();
let   fetchedReception;

if(pageSize &&currentPage){
receptionQuery
.skip(pageSize*(currentPage-1))
.limit(pageSize)
}
receptionQuery.then(receptionList=>{
  fetchedReception=receptionList
  return Reception.count();
}).then(count=>{
res.status(200).json({
  reception:fetchedReception,
  maxCount:count
})
})
}

// delete reception
exports.deleteReception =(req,res,next)=>{
  Reception.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record deleted'
    })
  })
}

// get reception by id
exports.getReceptionById =(req,res,next)=>{
  Reception.findById(req.params.id).then(reception=>{
    if(reception){
      res.status(200).json({
        reception
      })
    }else{
      return res.status(404).json({ message: 'reception not found' })
    }
  })
}

// update Reception
exports.updateReception =(req,res,next)=>{
  const reception = new Reception({
    _id:req.params.id,
    name:req.body.name,
    phone:req.body.phone,
    address:req.body.address,
    creator:req.userData.userId
  })
Reception.updateOne({_id:req.params.id},reception).then(result=>{
  res.status(200).json({
    message:"one record updated"
  })
})
}