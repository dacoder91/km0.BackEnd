

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');


var paisSchema = new Schema({
    nombre: { type:String, required: [true, 'El nombre del pais es necesario']},
    activo: {type:Boolean, default: true},
    codigotelf: { type:String, required: [true, 'El código del país es necesario']},
    provincias: [{ type:Schema.Types.ObjectId, ref:'Provincia', required:false}]


    }, {collection:'Paises'});

paisSchema.plugin(uniqueValidator, {message: 'El {PATH} debe de ser único'} );


module.exports = mongoose.model('Pais', paisSchema);