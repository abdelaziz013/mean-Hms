
const express = require('express');
const router = express.Router();
const Reception = require('../models/reception');
const checkAuth =require ('../middleware/check-auth')
const User = require('../models/user')

// add reception
router.post('/add-reception',checkAuth,(req,res)=>{

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
  })


// get receptionList
router.get('/reception-list',(req,res)=>{
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
  })


  // delete reception
  router.delete('/del-reception/:id',(req,res)=>{
    Reception.deleteOne({_id:req.params.id}).then(result=>{
      res.status(200).json({
        messahe:'one record deleted'
      })
    })
  })

  // get reception by id
  router.get('/:id',(req,res)=>{
    Reception.findById(req.params.id).then(reception=>{
      if(reception){
        res.status(200).json({
          reception
        })
      }else{
        return res.status(404).json({ message: 'reception not found' })
      }
    })
  })

  // update reception
  router.put('/edit-reception/:id',checkAuth,(req,res)=>{
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

  })


module.exports = router;
