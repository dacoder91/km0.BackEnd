var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var motorcycleSchema = new Schema({
    brand: { type: String, required: true }, // Marca de la motocicleta
    model: { type: String, required: true },
    year: { type: Number, required: false },
    licensePlate: { type: String, required: true },// Matricula de la motocicleta
    // motorcyclePhoto: { type: Buffer, required: false },// Foto de la motocicleta
    motorcycleServiceBook: [{ type:Schema.Types.ObjectId, ref:'ServiceRecord', required:false}],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario dueño de la moto
    avatar: { type: String, required: false }, // Avatar de la motocicleta
    description: { type: String, required: false }, // Descripción de la motocicleta
    createdAt: { type: Date, default: Date.now }, // Fecha de creación del registro
    updatedAt: { type: Date, default: Date.now } // Fecha de actualización del registro

}, {collection:'Motorcycle'});
// para asociar el pluging propio de mongoose
// motorcycleSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

// Para poder trabajar con el esquema fuera hay que exportarlo
module.exports = mongoose.model('Motorcycle', motorcycleSchema);
