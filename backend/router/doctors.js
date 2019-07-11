const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor')
const checkAuth = require('../middleware/check-auth')
// const User = require('../models/user')



router.post('/add-doctor', checkAuth, (req, res, next) => {
  const doctor = new Doctor({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    speciality: req.body.speciality,
    rank: req.body.rank,
    creator: req.userData.userId
  });

  doctor.save().then(savedDoctor => {
    res.status(201).json({
      message: "doctor added"
    })
  })
  .catch(error => {
    res.status(404).json({
      message:error.message
  });
  })
})

router.put('/edit-doctor/:id', checkAuth, (req, res, next) => {
  const doctor = new Doctor({
    _id: req.params.id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    speciality: req.body.speciality,
    rank: req.body.rank,
    creator: req.userData.userId
  });
  Doctor.updateOne({ _id: req.params.id }, doctor).then(updatedDoctor => {
      res.status(200).json({
        message: 'update successful'
    })
  }) .catch(error => {
    res.status(404).json({
      message:error.message
  });
});
})

// get doctor list
router.get('', (req, res, next) => {
  // put + to convert query to number
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const doctorQuery = Doctor.find();
  let fetchedDoctor;

  if (pageSize && currentPage) {
    doctorQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  doctorQuery
   .populate('creator')
  .then(doctors => {
    fetchedDoctor = doctors
    return Doctor.count();
  }).then(count => {
    res.status(200).json({
      doctors: fetchedDoctor,
      maxCount: count
    })
  })
})

// get foctor by id
router.get('/:id', checkAuth, (req, res, next) => {
  Doctor.findById(req.params.id)
    .populate('creator')
    .then(doctor => {
      if (doctor) {
        res.status(200).json({ doctor: doctor })
      } else {
        return res.status(404).json({ message: 'doctor not found' })
      }
    })
})

// delete doctor
router.delete('/:id', checkAuth, (req, res) => {
  Doctor.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: "doctor deleted"
    })
  })
})

module.exports = router;

