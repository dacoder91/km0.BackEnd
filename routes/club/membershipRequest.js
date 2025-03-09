const express = require('express');
const MembershipRequest = require('../../models/club/membershipRequest');
const Member = require('../../models/club/member');

const app = express();

// Ruta para aceptar una solicitud de membresía
app.post('/accept', async (req, res) => {
    const { requestId } = req.body;

    try {
        const request = await MembershipRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({
                ok: false,
                message: 'Solicitud no encontrada'
            });
        }

        request.status = 'ACCEPTED';
        request.responseDate = new Date();
        await request.save();

        const member = new Member({
            user: request.user,
            club: request.club,
            role: 'MEMBER_ROLE'
        });
        await member.save();

        res.status(200).json({
            ok: true,
            message: 'Solicitud aceptada y miembro agregado al club'
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al aceptar la solicitud',
            errors: err
        });
    }
});

// Ruta para rechazar una solicitud de membresía
app.post('/reject', async (req, res) => {
    const { requestId } = req.body;

    try {
        const request = await MembershipRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({
                ok: false,
                message: 'Solicitud no encontrada'
            });
        }

        request.status = 'REJECTED';
        request.responseDate = new Date();
        await request.save();

        res.status(200).json({
            ok: true,
            message: 'Solicitud rechazada'
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al rechazar la solicitud',
            errors: err
        });
    }
});

module.exports = app;