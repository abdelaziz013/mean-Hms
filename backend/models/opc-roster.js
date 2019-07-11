
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opcRosterSchema = new Schema({
  date:{
    type:Date
},
shift:{
    type:Schema.Types.ObjectId,
    ref:'OpcShift'
},
opc:{
    type:Schema.Types.ObjectId,
    ref:'Opc'
},
doctor:{
  type:Schema.Types.ObjectId,
  ref:'Doctor'
},
creator:{
  type:Schema.Types.ObjectId,
  required : true,
  ref:'User'
}
})



module.exports = mongoose.model('OpcRoser',opcRosterSchema)
