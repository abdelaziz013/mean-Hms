
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  phone: {
    type: Number,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    require: true
  },
  maritalStatus: {
    type: String,
    require: true
  },
  caringDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  patientType: {
    type: String,
    require: true
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  opc: {
    type: Schema.Types.ObjectId,
    ref: 'Opc'
  },
  regDate: {
    type: Date,
    default: Date.now()
  },
  checkoutDate: {
    type: Date
  },
  creator:{
    type:Schema.Types.ObjectId,
    required : true,
    ref:'User'
  }
});

module.exports = mongoose.model('Patient', patientSchema);


