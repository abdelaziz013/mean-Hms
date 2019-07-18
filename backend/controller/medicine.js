
Medicine = require('../models/medicine');


// add medicine
exports.addMedicine =(req,res,next)=>{
  const medicine = new Medicine({
    name: req.body.name,
    cost: req.body.cost,
    creator: req.userData.userId
  })

  medicine.save().then(savedMed => {
    res.status(200).json({
      message: 'new medicine added'
    })
  })
  .catch(error => {
    res.status(404).json({
      messsage:error.message
  });
});
}

// medicine list 
exports.getMedicineList =(req,res,next)=>{
  const pageSize = +req.query.pagesize,
        currentPage = +req.query.page,
        medQuery = Medicine.find({});
  let fetchedMed;

  if (pageSize && currentPage) {
    medQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }

  medQuery.then(medList => {
    fetchedMed = medList
    return Medicine.count()
  }).then(count => {
    res.status(200).json({
      medicine: fetchedMed,
      maxCount: count
    })
  })
}

// get medicine by Id
exports.getMedicineById =(req,res,next)=>{
  Medicine.findById(req.params.id).then(medicine=>{
    if(medicine){
      res.status(200).json({
        medicine
      })
    }else{
      return res.status(404).json({ message: 'medicine not found' })
    }
  })
}

// edit medicine by id
exports.editMedicineById =(req,res,next)=>{
  const medicine = new Medicine({
    _id:req.params.id,
    name: req.body.name,
    cost: req.body.cost,
    creator: req.userData.userId
  })

  Medicine.updateOne({_id:req.params.id},medicine)
  .then(result=>{
    res.status(200).json({
      message:"one record updated"
    })
  })
  .catch(error=>{
    res.status(404).json({
      messsage:error.message
  });
  })
}

// delete medicine
exports.deleteMedicine=(req,res,next)=>{
  Medicine.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record deletee'
    })
  })
}
