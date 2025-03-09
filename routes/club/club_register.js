var express = require('express');
var Club = require('../../models/club/club'); // Importa el modelo del club

var app = express();
app.use(express.json());

// Ruta para registrar un nuevo club
app.post('/', (req, res) => {

    console.log('POST /club/register');
    var body = req.body;

    if (!body.name) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El nombre del club es obligatorio',
            body
        });
    }

    var club = new Club({
        name: body.name,
        nick: body.nick,
        description: body.description,
        location: body.location,
        foundationDate: body.foundationDate,
        membersCount: body.membersCount,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        socialMedia: body.socialMedia,
        events: body.events,
        profileImage: body.profileImage,
        website: body.website,
        active: body.active,
        signUpDate: body.signUpDate,
        lastAccessDate: body.lastAccessDate
    });

    club.save((err, clubGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al registrar el club',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            club: clubGuardado
        });
    });
});

module.exports = app;