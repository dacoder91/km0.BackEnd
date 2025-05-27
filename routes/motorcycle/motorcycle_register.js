var express = require('express');
var Motorcycle = require('../../models/motorcycle/motorcycle'); // Corregida la ruta de importación

var app = express();
app.use(express.json());

// Ruta para registrar una nueva motocicleta
app.post('/', (req, res) => {
    // Verificar que los campos requeridos estén presentes
    if (!req.body.brand || !req.body.model  || !req.body.licensePlate) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Todos los campos obligatorios deben estar presentes',
            body: req.body
        });
    }

    var newMotorcycle = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        licensePlate: req.body.licensePlate, // Corregido - era req.body.color
        motorcyclePhoto: req.body.motorcyclePhoto || null, // Campo opcional
        motorcycleServiceBook: req.body.motorcycleServiceBook || [], // Array vacío por defecto
        owner: req.body.owner, // ID del usuario dueño de la moto
        avatar: req.body.avatar || null, // Campo opcional
        description: req.body.description || '', // Campo opcional
        createdAt: new Date(), // Fecha de creación del registro
        updatedAt: new Date() // Fecha de actualización del registro
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