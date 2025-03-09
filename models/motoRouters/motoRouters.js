var mongoose = require('mongoose');

// npm install mongoose-unique-validator --save
// Este pluging nos ayuda a controlar los errores de validaciones
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var motoRouteSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    dateEvent: { type: Date, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true }
});
// para asociar el pluging propio de mongoose
motoRouteSchema.plugin(uniqueValidator, {message: 'El {PATH} debe de ser único'} );

// Para poder trabajar con el esquema fuera hay que exportarlo
// Nombre que queremos que tenga el modelo y el objeto que queremos que relacione
module.exports = mongoose.model('Routes', motoRouteSchema);