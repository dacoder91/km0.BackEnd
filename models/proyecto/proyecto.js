// POR AQUI NOS LLEGA LAS PETICIONES O PROPUESTAS DE TRABAJO DE LOS CLIENTES

const mongoose = require('mongoose');

// Este pluging nos ayuda a controlar los errores de validaciones
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let proyectoSchema = new Schema({
    nombre: {type: String, unique:true, required: [true, 'El nombre es necesario']},
    abreviatura: {type: String, unique:true, required: [true, 'La abreviatura es necesaria']},
    expediente: {type: String,required: true},
    observaciones: {type: String,required: false},
    user: [{ type:Schema.Types.ObjectId, ref:'User', required:true}],
    fRegistro: {type: Date, required:true}, // Fecha cuando ingresamos la nota
    activo: {type:Boolean, required:true, default: false},
});

// para asociar el pluging propio de mongoose
proyectoSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

module.exports = mongoose.model('Proyecto', proyectoSchema);