var mongoose = require('mongoose');

// npm install mongoose-unique-validator --save
// Este pluging nos ayuda a controlar los errores de validaciones
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
    };
   

var userSchema = new Schema({
    email: { type:String, unique:true, required: [true, 'El correo es necesario']},
    password: { type: String, required: [true, 'La contraseña es necesaria']},
    name: { type: String, required: false},
    surname: { type: String, required: false },
    nick: { type: String, required: false },
    role: {type:String, required:true, default: 'USER_ROLE', enum: rolesValidos},
    active: {type:Boolean, required:true, default: true},
    signUpDate: {type:Date,required:true, default: new Date()},
    lastAccessDate: { type:Date, required:true, default: new Date()},
});

// para asociar el pluging propio de mongoose
userSchema.plugin(uniqueValidator, {message: 'El {PATH} debe de ser único'} );

// Para poder trabajar con el esquema fuera hay que exportarlo
// Nombre que queremos que tenga el modelo y el objeto que queremos que relacione
module.exports = mongoose.model('User', userSchema);