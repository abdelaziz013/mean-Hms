
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name:{
      type:String,
      required:true,
      minlength:3,
      trim :true,
  },
  phone:{
      type:Number,
      required:true,
      minlength:11,
      trim :true
  },
  email:{
      type:String,
      trim :true
  },
  speciality:{
      type:String,
      default:'General'
},
  rank:{
      type:String,
      default:'General'
  },
  creator:{
    type:Schema.Types.ObjectId,
    required : true,
    ref:'User'
  }
});


module.exports = mongoose.model('Doctor',doctorSchema)


