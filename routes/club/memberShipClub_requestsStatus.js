const express = require('express');
const Member = require('../../models/club/member');
const User = require('../../models/user/user');
const Club = require('../../models/club/club');

const app = express();

// -- FUNCION PARA CAMBIAR EL ESTADO DE UN MIEMBRO DEL CLUB YA SEA PARA ACEPTARLO O RECHAZARLO, SUSPENDERLO, ETC..  -

const updateMemberStatus = async (req, res) => {
    const { userIdClub, memberId, newStatus } = req.body;

    try {
        // Verificar que el miembro existe
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({
                ok: false,
                message: 'Miembro no encontrado'
            });
        }
        TODO: // VERIFICAR QUE EL USUARIO DEL CLUB UE VA A REALIZAR EL CAMBIO DE STATUS Y ROL TENGA LOS PRIVILEGIOS NECESARIOS PARA REALIZARLO -- UserIdClub --
        // UserIdClub  = id del usuario del club que va a realizar el cambio de status y rol
        // con esate atributo comprobaremos que el usuario que va a realizar el cambio de status y rol tenga los privilegios necesarios para realizarlo
        //
        // FALTA REALIZAR EL CODIGO DE VALIDACION
        //
        //

        

        // Actualizar el estado del miembro
        member.status = newStatus;

        // Agregar una entrada al historial de estados
        member.statusHistory.push({
            status: newStatus,
            date: new Date(),
            statusHistory: [{
                status: newStatus,
                date: new Date()
            }]
        });

        // Guardar los cambios en la base de datos
        await member.save();

        res.status(200).json({
            ok: true,
            message: 'Estado del miembro actualizado correctamente',
            member: member
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el estado del miembro',
            errors: err
        });
    }
};

// Esta función se encarga de agregar una solicitud realizada por un usuario para ser miembro de un club
// Para ello se debe enviar el id del usuario y el id del club
// La solicitud se guarda en la base de datos con el estado 'PENDING'
const addMemberToClub = async (req, res) => {
    const { userId, clubId } = req.body;

    try {
        // Verificar que el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }

        // Verificar que el club existe
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({
                ok: false,
                message: 'Club no encontrado'
            });
        }

        // Crear el nuevo miembro
        const member = new Member({
            id_user: userId,
            id_club: clubId,
            status: 'PENDING',
            statusHistory: [{
                status: 'PENDING',
                date: new Date()
            }]
        });

        // Guardar el miembro en la base de datos
        await member.save();

        res.status(200).json({
            ok: true,
            message: 'Miembro agregado al club correctamente',
            member: member
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al agregar el miembro al club',
            errors: err
        });
    }
};

// Ruta para agregar un miembro a un club
app.post('/add-member', addMemberToClub);

// Ruta para actualizar el estado de un miembro del club
app.post('/update-status', updateMemberStatus);

module.exports = app;