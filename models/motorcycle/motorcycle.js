var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var motorcycleSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true }
});


// para asociar el pluging propio de mongoose
motorcycleSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

// Para poder trabajar con el esquema fuera hay que exportarlo
module.exports = mongoose.model('Motorcycle', motorcycleSchema);
