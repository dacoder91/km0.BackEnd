var express = require('express');
var Club = require('../../models/club/club'); // Importa el modelo del club

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

        res.status(200).json({
            ok: true,
            clubes: clubes
        });
    });
});

module.exports = app;