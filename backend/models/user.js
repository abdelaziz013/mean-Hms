
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  name:{
  type:String,
  required:true,
  minlength:3,
  trim :true,
},
userRole:{
  type:String,
  required:true,
  minlength:3,
  trim :true
},
username:{
  type:String,
  required:true,
  minlength:3,
  trim :true,
  unique: true
},
password:{
      type: String,
      required: true,
      unique: true
},
doctor: {
  type: Schema.Types.ObjectId,
  ref: 'Doctor'
}
})

userSchema.plugin(uniqueValidator,{messsage:'is already taken.'})

module.exports = mongoose.model('User', userSchema)
