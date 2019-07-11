
const express = require('express'),
  router = express.Router(),
  checkAuth = require('../middleware/check-auth'),
  Medicine = require('../models/medicine');

// add medicine
router.post('/add-medicne', checkAuth, (req, res) => {
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
})

// get medicine list
router.get('/list', checkAuth, (req, res) => {
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
})


// get medicine by ID
router.get('/:id',(req,res)=>{
  Medicine.findById(req.params.id).then(medicine=>{
    if(medicine){
      res.status(200).json({
        medicine
      })
    }else{
      return res.status(404).json({ message: 'medicine not found' })
    }
  })
})

// edit medicine
router.put('/edit-medicine/:id',checkAuth,(req,res)=>{
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
})


// delete
router.delete('/:id',(req,res)=>{
  Medicine.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message:'one record deletee'
    })
  })
})







module.exports = router;


