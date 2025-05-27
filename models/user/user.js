var mongoose = require('mongoose');

// npm install mongoose-unique-validator --save
// Este pluging nos ayuda a controlar los errores de validaciones
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var validRoles  = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
    };
   

var userSchema = new Schema({
    nick: { type: String, unique:true, required: false },
    name: { type: String, required: false},
    surname: { type: String, required: false },
    contactPhoneNumber: { type: String, required: false },
    emergencyContactPhone: { type: String, required: false },
    birdDate: { type: String, required: false },
    motorcycles: [{ type:Schema.Types.ObjectId, ref:'Motorcycle', required:false}],
    notificationsEnabled: { type: Boolean, default: true , required: true },
    sharedLocation: { type: Boolean, default: true , required: true },
    email: { type:String, unique:true, required: [true, 'El correo es necesario']},
    password: { type: String, required: [true, 'La contraseña es necesaria']},
    role: {type:String, required:true, default: 'USER_ROLE', enum: validRoles },
    active: {type:Boolean, required:true, default: true},
    signUpDate: {type:Date,required:true, default: new Date()},
    lastAccessDate: { type:Date, required:true, default: new Date()},
    photo: { type: Buffer, required: false }, // Campo para almacenar la foto en formato bitmap
    avatar: { type: String, required: false }, // Nuevo campo para almacenar el avatar en base64
    coverImage: { type: String, required: false }, // Nuevo campo para almacenar el avatar en base64
    // completedRoutes: [{ type:Schema.Types.ObjectId, ref:'Routes', required:false}],
});

// para asociar el pluging propio de mongoose
userSchema.plugin(uniqueValidator, {message: 'El {PATH} debe de ser único'} );

// Para poder trabajar con el esquema fuera hay que exportarlo
// Nombre que queremos que tenga el modelo y el objeto que queremos que relacione
module.exports = mongoose.model('User', userSchema);