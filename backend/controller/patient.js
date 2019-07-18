
const Patient = require("../models/patient"),
Bill = require("../models/bill"),
Room = require("../models/room");


// add patient
exports.addPatient =(req,res,next)=>{
  const patient = new Patient({
    name: req.body.name,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
    maritalStatus: req.body.maritalStatus,
    caringDoctor: req.body.caringDoctor,
    patientType: req.body.patientType,
    opc: req.body.opc,
    room: req.body.room,
    creator: req.userData.userId
  });

  patient
    .save()
    .then(savedpatient => {
      Room.findOneAndReplace(
        { _id: savedpatient.room },
        { $set: { roomStatus: "occupied" } },
        (err, result) => {
          if (err) {
            return err;
          }
        }
      );

      res.status(200).json({
        savedpatient,
        message: "new patient added"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
}


//get in patient
exports.getInpatient=(req,res,next)=>{
  const pageSize = +req.query.pagesize,
    currentPage = +req.query.page,
    id = req.query.id
  if (id !== 'undefined') {
    patientQuery = Patient.find({ patientType: "InPatient", caringDoctor: id });
  } else {
    patientQuery = Patient.find({ patientType: "InPatient" });
  }

  let fetchedPatient;
  if (pageSize && currentPage) {
    patientQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  patientQuery
    .populate("creator")
    .populate("room")
    .populate("caringDoctor")
    .then(patientList => {
      fetchedPatient = patientList;
      return patientQuery.count();
    })
    .then(count => {
      res.status(200).json({
        patient: fetchedPatient,
        maxCount: count
      });
    });
}

// get out-patient
exports.getOutPatient =(req,res,next)=>{
  const pageSize = +req.query.pagesize,
    currentPage = +req.query.page,
    id = req.query.id
  if (id !== 'undefined') {
    patientQuery = Patient.find({ patientType: "OutPatient", caringDoctor: id });
  } else {
    patientQuery = Patient.find({ patientType: "OutPatient" });
  }

  let fetchedPatient;
  if (pageSize && currentPage) {
    patientQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  patientQuery
    .populate("opc")
    .populate(" caringDoctor")
    .then(patientList => {
      fetchedPatient = patientList;
      return patientQuery.count();
    })
    .then(count => {
      res.status(200).json({
        patient: fetchedPatient,
        maxCount: count
      });
    });
}

// get patient  by id
exports.getPatientById =(req,res,next)=>{
  Patient.findOne({ _id: req.params.id })
  .populate("room")
  .populate("opc")
  .populate("caringDoctor")
  .then(patient => {
    res.status(200).json({
      patient,
      message: "one patient found"
    });
  });
}


// get edit-patient by id
exports.getEditPatientById =(req,res,next)=>{
  Patient.findOne({ _id: req.params.id }).then(patient => {
    res.status(200).json({
      patient,
      message: "one patient found"
    });
  });
}

// update Patient
exports.updatePatient =(req,res,next)=>{
  const patient = new Patient({
    _id: req.params.id,
    name: req.body.name,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
    maritalStatus: req.body.maritalStatus,
    caringDoctor: req.body.caringDoctor,
    patientType: req.body.patientType,
    creator: req.userData.userId,
    opc: req.body.opc
  })
  Patient.updateOne({ _id: req.params.id }, patient).then(savedPatient => {
    res.status(200).json({
      patient,
      message: "one patient updated"
    });
  }).catch(error => {
    res.status(404).json({
      message: error.message
    });
  })
}

// add dischargeDate
exports.addDischargeDate =(req,res,next)=>{
  Patient.findOne({ _id: req.params.id }).then(patient => {
    patient.checkoutDate = req.body.dischargeDate;
    patient.save().then(savedPatient => {
      Room.findOneAndReplace(
        { _id: savedPatient.room },
        { $set: { roomStatus: "empty" } },
        (err, result) => {
          if (err) {
            return err;
          }
        }
      );
      res.status(200).json({
        id: savedPatient.id,
        message: "discharge date added"
      });
    });
  });
}



// add patient bill
exports.addPatientBill =(req,res,next)=>{
  const bill = new Bill({
    serviceCost: req.body.serviceCost,
    roomCost: req.body.roomCost,
    medicineCost: req.body.medicineCost,
    patient: req.params.id,
    creator: req.userData.userId
  });

  bill.save().then(savedBill => {
    res.status(200).json({
      message: "new bill added"
    });
  });
}

// bill list
exports.getBillList =(req,res,next)=>{
  Bill.find({})
    .populate('patient')
    .populate("creator")
    .then(billList => {
      res.status(200).json({
        billList,
        message: "bill was found"
      });
    });
}

// get Bill By Id
exports.getBillById =(req,res,next)=>{
  let fetchedBill;
  Bill.findById(req.params.id)
    .populate("creator")
    .then(bill => {
      Patient.findById(bill.patient)
        .populate(" caringDoctor")
        .then(patient => {
          res.status(200).json({
            patient,
            bill
          })
        })
    })
}

// get bill by patient id
exports.getBillByPatientId =(req,res,next)=>{
  Bill.findOne({ patient: req.params.id }).then(bill => {
    res.status(201).json({
      bill
    })
  }).catch(error => {
    res.status(200).json({
      message: error.message
    });
  })

}


// delelete patient bill and change room status
exports.deleteBill =(req,res,next)=>{
  Patient.findById(req.params.id).then(patient => {
    Room.findOneAndReplace(
      { _id: patient.room },
      { $set: { roomStatus: "empty" } },
      (err, result) => {
        if (err) {
          return err;
        }
      }
    );

    Bill.deleteOne({patient: req.params.id }).then(result => {
      Patient.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
          message: "patient deleted"
        })
      })
    })
  })
}

