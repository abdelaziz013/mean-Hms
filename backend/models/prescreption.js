


const mongoose= require ('mongoose');

const Schema  = mongoose.Schema;

const prescreptionSchema = new Schema({
    dose:{
        type:String,
        required:true,
        trim :true,
    },
    patient:{
        type:Schema.Types.ObjectId,
        ref:'Patient'
        },

    medicine:{
        type:Schema.Types.ObjectId,
        ref:'Medicine'
    },
    creator:{
      type:Schema.Types.ObjectId,
      required : true,
      ref:'User'
    }
});

module.exports =mongoose.model('Prescreption', prescreptionSchema);


