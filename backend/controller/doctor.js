const Doctor = require('../models/doctor')

// add doctor
exports.postDoctor =(req,res,next)=>{
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
}
// rdit doctor
exports.editDoctor =(req,res,next)=>{
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
}

// get doctor list
exports.getDoctorList =(req,res,next)=>{
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
}

// get doctor by id
exports.getDoctorById =(req,res,next)=>{
  Doctor.findById(req.params.id)
    .populate('creator')
    .then(doctor => {
      if (doctor) {
        res.status(200).json({ doctor: doctor })
      } else {
        return res.status(404).json({ message: 'doctor not found' })
      }
    })
}

// delete doctor
exports.deleteDoctor =(req,res,next)=>{
  Doctor.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: "doctor deleted"
    })
  })
}