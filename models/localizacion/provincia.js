

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');


var provinciaSchema = new Schema({
    codigoProvincia: { type:Number, required: [true, 'El código de la provincia es necesario']},
    provincia: { type:String, required: [true, 'El nombre de la provincia es necesario']},
    activo: {type:Boolean, default: true}
    
    }, {collection:'Provincias'});

provinciaSchema.plugin(uniqueValidator, {message: 'El {PATH} debe de ser único'} );


module.exports = mongoose.model('Provincia', provinciaSchema);