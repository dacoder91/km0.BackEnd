// POR AQUI NOS LLEGA LAS PETICIONES O PROPUESTAS DE TRABAJO DE LOS CLIENTES

const mongoose = require('mongoose');

// Este pluging nos ayuda a controlar los errores de validaciones
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
var provincia = {
    values: ['ALMERIA', 'GRANADA', 'JAEN', 'CORDOBA', 'SEVILLA', 'HUELVA', 'CADIZ', 'MALAGA'],
    message: '{VALUE} no es una provincia permitida'
    };

let usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    apellidos: {type: String, required: [true, 'Los apellidos son necesarios']},
    dni: {type: String, unique:true, required: [true, 'El correo es necesario']},
    genero: {type: String,required: [true, 'El Género es necesario']},
    provincia: { type:Schema.Types.ObjectId, ref:'Provincia',required: [true, 'La provincia es necesaria']},
    municipio: { type:Schema.Types.ObjectId, ref:'Municipio',required: [true, 'El minicipio es es necesario']},
    gradoDiscapacidad: {type: String,required: [true, 'El grado de Discapacidad']},
    tipoDiscapacidad: {type: String,required: [true, 'El grado de Discapacidad']},
    fnacimiento: {type: Date, required: [true, 'La fecha de nacimiento es necesaria']}, // La fecha de nacimiento es 
    telefono: {type: String,required: [true, 'El teléfono es necesario']},
    direccion: {type: String,required: false},
    cp: {type: String,required: [true, 'El código postal necesario']},
    email: {type: String, required: false},
    asistencia: [{ type:Schema.Types.ObjectId, ref:'Asistencia', required:false}],
    proyecto:[{ type:Schema.Types.ObjectId, ref:'Proyecto', required:false}],
    proyectosFirmados:[{type: Object,required:false}],
    user: [{ type:Schema.Types.ObjectId, ref:'User', required:true}],
    fRegistro: {type: Date, required:true}, // Fecha cuando ingresamos la nota
    cuidador: {type:Boolean, required:true, default: false},
    desfavorecida: {type:Boolean, required:true, default: false},
    activo: {type:Boolean, required:true, default: true},
});

// para asociar el pluging propio de mongoose
usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);