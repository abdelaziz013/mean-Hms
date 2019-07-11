


const mongoose= require ('mongoose');

const Schema  = mongoose.Schema;

const patientService = new Schema({

    patient:{
        type:Schema.Types.ObjectId,
        ref:'patient'
        },

    pService:{
        type:Schema.Types.ObjectId,
        ref:'Services'
    },
    creator:{
      type:Schema.Types.ObjectId,
      required : true,
      ref:'User'
    }


});

module.exports =mongoose.model('PatientService', patientService );



