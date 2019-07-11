
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
  symptoms: {
    type: String,
    required: true,
    trim: true,
  },
  signs: {
    type: String,
    required: true,
    trim: true
  },
  pastHistory: {
    type: String,
    required: true,
    trim: true
  },
  diagnosis: {
    type: String,
    required: true,
    trim: true
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);


