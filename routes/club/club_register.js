var express = require('express');
var Club = require('../../models/club/club'); // Importa el modelo del club
var dateUtils = require('../../utils/dateUtils'); // Importar utilidades de fecha

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

    // Parsear la fecha de fundación si viene en formato DD/MM/YYYY
    const foundationDate = body.foundationDate ? dateUtils.parseDate(body.foundationDate) : null;

    var club = new Club({
        name: body.name,
        nick: body.nick,
        description: body.description,
        // location: body.location,
        foundationDate: foundationDate,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        // socialMedia: body.socialMedia,
        events: body.events,
        profileImage: body.profileImage,
        website: body.website,
        active: body.active
    });

    club.save((err, clubGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al registrar el club',
                errors: err
            });
        }

        // Convertir a objeto plano y formatear explícitamente la fecha
        const clubObj = clubGuardado.toObject();
        
        // Formatear la fecha de fundación explícitamente
        if (clubObj.foundationDate) {
            clubObj.foundationDate = dateUtils.formatDate(clubGuardado.foundationDate);
        }

        res.status(201).json({
            ok: true,
            club: clubObj
        });
    });
});

module.exports = app;