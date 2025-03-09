var express = require('express');
var MotoRoute = require('../../../models/motoRoutes'); // Importa el modelo de motoRoutes

var app = express();
app.use(express.json());

// Ruta para registrar una nueva ruta completada
app.post('/', (req, res) => {
    var newRoute = {
        id: req.body.id,
        name: req.body.name,
        dateEvent: req.body.dateEvent,
        origin: req.body.origin,
        destination: req.body.destination,
        userId: req.body.userId
    };

    var motoRoute = new MotoRoute(newRoute);

    motoRoute.save((err, routeGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al registrar la ruta',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            route: routeGuardada
        });
    });
});

module.exports = app;