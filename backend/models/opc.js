const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const opcSchema = new Schema({
    name:{
        type:String,
        minlength:3,
        required:true
    },
    creator:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'User'
    }
})

opcSchema.plugin(uniqueValidator,{messsage:'is already taken.'})


module.exports = mongoose.model('Opc', opcSchema)
