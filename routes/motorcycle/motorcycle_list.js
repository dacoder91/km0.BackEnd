var express = require('express');
var Motorcycle = require('../../../models/motorcycle'); // Importa el modelo de motorcycle

var app = express();
app.use(express.json());

// Ruta para listar todas las motocicletas
app.get('/list', (req, res) => {
    Motorcycle.find({}, (err, motorcycles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al listar las motocicletas',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            motorcycles: motorcycles
        });
    });
});

module.exports = app;