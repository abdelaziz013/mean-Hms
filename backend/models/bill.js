const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
  serviceCost: {
    type: Number

  },
  roomCost: {
    type: Number
  },

  medicineCost: {
    type: Number
  },

  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }


});

module.exports = mongoose.model('Bill', billSchema);

