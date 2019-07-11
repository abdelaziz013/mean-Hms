
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const medicineSchema =new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    cost:{
        type:String,
        required:true,
        trim:true
    },
    creator:{
      type:Schema.Types.ObjectId,
      required : true,
      ref:'User'
    }
})




medicineSchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports =mongoose.model('Medicine',medicineSchema)
