var mongoose = require('mongoose');

// npm install mongoose-unique-validator --save
// Este pluging nos ayuda a controlar los errores de validaciones
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var avisoSchema = new Schema({
    titulo: { type: String, required: [true, 'El título es necesario'] },
    descripcion: { type: String, required: [true, 'La descripción es necesaria'] },
    tipo: { type: String, required: [true, 'El tipo es necesario'] },
    fechaInicio: { type: Date, required: [true, 'La fecha de inicio es necesaria'] },
    fechaFin: { type: Date, required: [true, 'La fecha de fin es necesaria'] },
});

// para asociar el pluging propio de mongoose
avisoSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

// Para poder trabajar con el esquema fuera hay que exportarlo
module.exports = mongoose.model('Aviso', avisoSchema);