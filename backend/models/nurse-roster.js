
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nurseRosterSchema = new Schema({
  date:{
    type:Date
},
nurseShift:{
    type:Schema.Types.ObjectId,
    ref:'NurseShift'
},
nurse:[{
    type:Schema.Types.ObjectId,
    ref:'Nurse'
}],
creator:{
  type:Schema.Types.ObjectId,
  required : true,
  ref:'User'
}
})



module.exports = mongoose.model('NurseRoster',nurseRosterSchema )
