
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const nurseSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    trim: true,
    required: true,
    unique:true
  },
  phone: {
    type: String,
    required: true,
    minlength: 11,
    trim: true
  },
  address: {
    type: String
  },
  creator:{
    type:Schema.Types.ObjectId,
    required : true,
    ref:'User'
  }

})

nurseSchema.plugin(uniqueValidator,{messsage:'is already taken.'})
module.exports = mongoose.model('Nurse',nurseSchema)
