var express = require('express');
var Club = require('../../models/club/club'); // Importa el modelo del club
var dateUtils = require('../../utils/dateUtils'); // Importar utilidades de fecha

var app = express();
app.use(express.json());
console.log('GET /club/list');

// Ruta para listar todos los clubes
app.get('/', (req, res) => {
    Club.find({}, (err, clubes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al listar los clubes',
                errors: err
            });
        }

        // Formatear las fechas de los clubes
        const clubesFormateados = clubes.map(club => {
            const clubObj = club.toObject();
            
            // Formatear la fecha de fundación si existe
            if (clubObj.foundationDate) {
                clubObj.foundationDate = dateUtils.formatDate(club.foundationDate);
            }
            
            return clubObj;
        });

        res.status(200).json({
            ok: true,
            clubes: clubesFormateados
        });
    });
});

module.exports = app;