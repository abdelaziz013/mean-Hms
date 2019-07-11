
const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');




const serviceSchema =new Schema({
    serviceName:{
        type:String,
        trim:true,
        unique:true

    },
    serviceCategory:{
        type:String,
        trim:true,
        required : true,
    },
    serviceCost:{
        type:Number,
        trim:true,
        required : true
    },
    creator:{
      type:Schema.Types.ObjectId,
      required : true,
      ref:'User'
    }
})



serviceSchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = mongoose.model('Services',serviceSchema)
