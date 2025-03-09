var express = require('express');
var Motorcycle = require('../../../models/motorcycle'); // Importa el modelo de motorcycle

var app = express();
app.use(express.json());

// Ruta para registrar una nueva motocicleta
app.post('/register', (req, res) => {
    var newMotorcycle = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        licensePlate: req.body.color
    };

    var motorcycle = new Motorcycle(newMotorcycle);

    motorcycle.save((err, motorcycleGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al registrar la motocicleta',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            motorcycle: motorcycleGuardada
        });
    });
});

module.exports = app;