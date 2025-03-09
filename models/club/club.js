var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var clubSchema = new Schema({
    name: { type: String, required: [true, 'Hace falta el nombre del club'] },
    nick: { type: String, required: false },
    description: { type: String, required: false },
    location: { type: String, required: false },
    foundationDate: { type: Date, required: false },
    membersCount: { type: Number, required: false, default: 0 },
    contactEmail: { type: String, required: false },
    contactPhone: { type: String, required: false },
    events: [{ type: String, required: false }],
    profileImage: { type: String, required: false },
    website: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
    signUpDate: { type: Date, required: true, default: new Date() },
    lastAccessDate: { type: Date, required: true, default: new Date() }
});

// para asociar el pluging propio de mongoose
clubSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

// Para poder trabajar con el esquema fuera hay que exportarlo
module.exports = mongoose.model('Club', clubSchema);