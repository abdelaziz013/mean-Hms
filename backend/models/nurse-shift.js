
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const nurseShiftSchema = new Schema({
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



module.exports = mongoose.model('NurseShift',nurseShiftSchema)

