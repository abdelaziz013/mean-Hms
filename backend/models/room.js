
const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const roomSchema = new Schema({
    roomType:{
        type:String,
        required:true
    },
    roomNumber:{
        type:String,
        required:true,
        unique: true
    },
    roomCost:{
        type:String
    },
    roomStatus:{
        type:String,
        required:true,
        default:'Empty'
    },
    creator:{
      type:Schema.Types.ObjectId,
      required : true,
      ref:'User'
    }

})


roomSchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = mongoose.model('Room',roomSchema)
