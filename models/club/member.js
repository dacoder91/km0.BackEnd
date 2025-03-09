var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// PARA VER EL SIGNIFICADO DE LOS ROLES LEER EL ARCHIVO roles.md
var validRoles = {
    values: [
        'ADMIN_ROLE', 'SUPER_USER_ROLE', 'OWNER_ROLE', 'PRESIDENT_ROLE',
        'VICE_PRESIDENT_ROLE', 'ROAD_CAPTAIN_ROLE', 'TREASURER_ROLE',
        'SECRETARY_ROLE', 'SERGEANT_AT_ARMS_ROLE', 'MEMBER_ROLE',
        'PROSPECT_ROLE', 'GUEST_ROLE', 'EVENT_MANAGER_ROLE',
        'MECHANIC_ROLE', 'MODERATOR_ROLE'
    ],
    message: '{VALUE} no es un rol permitido'
};
var validStatus = {
    values: [
        'PENDING', 'ACCEPTED', 'REJECTED', 'PRESIDENT_ROLE',
        'SUSPENDED','EXPELLED', 'RESIGNED'
    ],
    message: '{VALUE} no es un rol permitido'
};

// Definimos el esquema

var memberSchema = new Schema({
    id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id_club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
    status: { type: String, required: true, enum: validStatus, default: 'PENDING' },
    role: { type: String, required: true, enum: validRoles, default: 'MEMBER_ROLE' },
    statusHistory: [{
        status: { type: String, enum: validStatus, required: true },
        date: { type: Date, required: true, default: new Date() }
    }]
});

// Para poder trabajar con el esquema fuera hay que exportarlo
module.exports = mongoose.model('Member', memberSchema);