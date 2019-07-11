

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opcShiftSchema = new Schema({
  shiftName:{
    type:String,
    required:true
},

startTime:{
    type:String,
    required:true,
    trim:true
},
endTime:{
    type:String,
    required:true
},
creator:{
  type:Schema.Types.ObjectId,
  required : true,
  ref:'User'
}
})



module.exports = mongoose.model('OpcShift',opcShiftSchema)

