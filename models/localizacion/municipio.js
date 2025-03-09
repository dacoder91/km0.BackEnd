

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');


var municipioSchema = new Schema({
    codigoMunicipio: { type:String, required: [true, 'El código del municipio es necesario']},
    municipio: { type:String,unique:true, required: [true, 'El nombre del municipio necesario']},
    provincia: {type:Schema.Types.ObjectId, ref:'Provincia', required:false},
    codigoprovincia: { type:String, required: [true, 'El código del municipio es necesario']},
    activo: {type:Boolean, default: true},


    }, {collection:'Municipios'});

    municipioSchema.plugin(uniqueValidator, {message: 'El {PATH} debe de ser único'} );


module.exports = mongoose.model('Municipio', municipioSchema);